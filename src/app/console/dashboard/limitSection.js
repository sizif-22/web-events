import { useState, useRef, useCallback, useMemo } from "react";
import { X, Users, Plus, Minus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase.user";

const LimitSection = ({ event }) => {
  // Memoized initial values
  const initialLimit = useMemo(() => event.limit, [event.limit]);
  const maxCapacity = useMemo(() => event.maxCapacity, [event.maxCapacity]);

  // State management
  const [state, setState] = useState({
    isParticipating: event.avlbl,
    customLimit: null,
    selectedLimit: null,
    showAlert: false,
    limit: initialLimit,
    errorMessage: { show: false, message: "" }
  });

  const inputRef = useRef(null);

  // Memoized preset limits based on max capacity
  const presetLimits = useMemo(() => {
    const baseLimits = [50, 100, 200];
    return baseLimits.filter(limit => limit <= maxCapacity);
  }, [maxCapacity]);

  // Debounced update function
  const updateEventLimit = useCallback(async (newLimit) => {
    try {
      await updateDoc(doc(db, "events", event.id), { limit: newLimit });
      setState(prev => ({ ...prev, limit: newLimit }));
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        errorMessage: {
          show: true,
          message: "Failed to update limit. Please try again."
        }
      }));
      return false;
    }
  }, [event.id]);

  // Enhanced error handling
  const setError = useCallback((message) => {
    setState(prev => ({
      ...prev,
      errorMessage: { show: true, message }
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        errorMessage: { show: false, message: "" }
      }));
    }, 3000);
  }, []);

  // Enhanced limit validation
  const validateLimit = useCallback((value) => {
    if (!value || isNaN(value)) {
      setError("Please enter a valid number");
      return false;
    }
    if (value > maxCapacity) {
      setError(`Limit cannot exceed maximum capacity of ${maxCapacity}`);
      return false;
    }
    if (value <= 0) {
      setError("Limit must be greater than 0");
      return false;
    }
    return true;
  }, [maxCapacity, setError]);

  // Enhanced handlers with optimistic updates
  const handleLimitSelect = useCallback(async (newLimit) => {
    if (!validateLimit(newLimit)) return;

    setState(prev => ({
      ...prev,
      selectedLimit: newLimit,
      customLimit: null,
      errorMessage: { show: false, message: "" }
    }));

    const success = await updateEventLimit(newLimit);
    if (success && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [validateLimit, updateEventLimit]);

  const handleCustomLimitChange = useCallback(async () => {
    const value = Number(inputRef.current?.value);
    if (!validateLimit(value)) return;

    setState(prev => ({
      ...prev,
      selectedLimit: null,
      customLimit: value,
      errorMessage: { show: false, message: "" }
    }));

    await updateEventLimit(value);
  }, [validateLimit, updateEventLimit]);

  const clearLimits = useCallback(async () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setState(prev => ({
      ...prev,
      customLimit: null,
      selectedLimit: maxCapacity,
      errorMessage: { show: false, message: "" }
    }));

    await updateEventLimit(maxCapacity);
  }, [maxCapacity, updateEventLimit]);

  // Enhanced participation toggle with optimistic updates
  const handleParticipationToggle = useCallback(() => {
    setState(prev => ({
      ...prev,
      showAlert: true,
      isParticipating: !prev.isParticipating
    }));

    const timer = setTimeout(async () => {
      try {
        await updateDoc(doc(db, "events", event.id), {
          avlbl: !state.isParticipating
        });
        setState(prev => ({ ...prev, showAlert: false }));
      } catch (error) {
        setError("Failed to update participation status");
        setState(prev => ({
          ...prev,
          isParticipating: !prev.isParticipating
        }));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [event.id, state.isParticipating, setError]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 w-full border border-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Users className="h-6 w-6 text-blue-600" />
          Participant Limits
        </h2>
        <Button
          variant={state.isParticipating ? "destructive" : "outline"}
          size="sm"
          onClick={handleParticipationToggle}
          className={`flex items-center gap-2 transition-all duration-300 ${
            state.isParticipating
              ? "hover:bg-red-700"
              : "hover:bg-green-600 hover:text-white"
          }`}
        >
          {state.isParticipating ? (
            <X className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {state.isParticipating ? "Close" : "Open"} Participating
        </Button>
      </div>

      {state.showAlert && (
        <Alert
          variant={state.isParticipating ? "destructive" : "default"}
          className="animate-fadeIn"
        >
          <AlertDescription className="font-medium">
            {state.isParticipating
              ? "Participation has been closed. No new participants can join."
              : "Participation is now open for new participants."}
          </AlertDescription>
        </Alert>
      )}

      {state.errorMessage.show && (
        <Alert variant="destructive" className="animate-fadeIn">
          <AlertDescription className="flex items-center gap-2">
            <X className="h-4 w-4" />
            {state.errorMessage.message}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700">
          Select Participant Limit
        </label>
        <div className="flex flex-wrap gap-3">
          {presetLimits.map(
            (limit) =>
              event.maxCapacity >= limit && (
                <Button
                  key={limit}
                  variant={state.selectedLimit === limit ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleLimitSelect(limit)}
                  className={`w-24 transition-all duration-300 ${
                    state.selectedLimit === limit
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  {limit}
                </Button>
              )
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700">
          Custom Limit
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            ref={inputRef}
            placeholder={`Enter limit (max ${event.maxCapacity})`}
            className="w-full focus:ring-2 focus:ring-blue-500"
            min="1"
            max={event.maxCapacity}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCustomLimitChange}
            className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
          >
            Submit
          </Button>
          {state.customLimit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                inputRef.current.value = "";
                setState(prev => ({ ...prev, customLimit: null }));
              }}
              className="p-2 hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <Alert className="flex-1">
          <AlertDescription className="flex items-center gap-2 font-medium">
            <Users className="h-4 w-4 text-blue-600" />
            Current limit: {state.limit}
          </AlertDescription>
        </Alert>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearLimits}
          className="ml-2 hover:bg-gray-100"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default LimitSection;
