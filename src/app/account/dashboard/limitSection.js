import React, { useState } from 'react';
import { X, Users, Plus, Minus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LimitSection = () => {
  const [isParticipating, setIsParticipating] = useState(true);
  const [customLimit, setCustomLimit] = useState('');
  const [selectedLimit, setSelectedLimit] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const presetLimits = [100, 200, 500];

  const handleLimitSelect = (limit) => {
    setSelectedLimit(limit);
    setCustomLimit('');
  };

  const handleCustomLimitChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && parseInt(value) <= 1000) {
      setCustomLimit(value);
      setSelectedLimit(null);
    }
  };

  const handleParticipationToggle = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setIsParticipating(!isParticipating);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Participant Limits
        </h2>
        <Button
          variant={isParticipating ? "destructive" : "outline"}
          size="sm"
          onClick={handleParticipationToggle}
          className="flex items-center gap-2"
        >
          {isParticipating ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {isParticipating ? "Close" : "Open"} Participating
        </Button>
      </div>

      {showAlert && (
        <Alert variant={isParticipating ? "destructive" : "default"}>
          <AlertDescription>
            {isParticipating 
              ? "Participation has been closed. No new participants can join."
              : "Participation is now open for new participants."}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Select Participant Limit</label>
        <div className="flex flex-wrap gap-2">
          {presetLimits.map((limit) => (
            <Button
              key={limit}
              variant={selectedLimit === limit ? "default" : "outline"}
              size="sm"
              onClick={() => handleLimitSelect(limit)}
              className="w-20"
            >
              {limit}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Custom Limit</label>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={customLimit}
            onChange={handleCustomLimitChange}
            placeholder="Enter limit (max 1000)"
            className="w-full"
          />
          {customLimit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCustomLimit('')}
              className="p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {(selectedLimit || customLimit) && (
        <div className="pt-2">
          <Alert>
            <AlertDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Maximum participants set to: {selectedLimit || customLimit}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default LimitSection;