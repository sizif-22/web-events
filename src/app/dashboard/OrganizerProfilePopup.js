import React, { useState, memo } from "react";
import {
  Mail,
  Calendar,
  Ban,
  Plus,
  History,
  Shield,
  UserCog,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const BanConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  const [banDuration, setBanDuration] = useState("7");

  const handleConfirm = () => {
    onConfirm(parseInt(banDuration));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Ban Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to ban this organizer? This will prevent them
            from accessing the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Select value={banDuration} onValueChange={setBanDuration}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="-1">Permanent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm Ban
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddPlanForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    credit: 0,
    maxCapacity: 100,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "credit" || name === "maxCapacity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="startDate" className="text-right">
          Start Date
        </Label>
        <Input
          id="startDate"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="endDate" className="text-right">
          End Date
        </Label>
        <Input
          id="endDate"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="credit" className="text-right">
          Credit
        </Label>
        <Input
          id="credit"
          name="credit"
          type="number"
          min="0"
          value={formData.credit}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="maxCapacity" className="text-right">
          Max Capacity
        </Label>
        <Input
          id="maxCapacity"
          name="maxCapacity"
          type="number"
          min="1"
          value={formData.maxCapacity}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Plan</Button>
      </DialogFooter>
    </form>
  );
};

const AddPlanDialog = ({ isOpen, onClose, onAddPlan }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Plan</DialogTitle>
        <DialogDescription>
          Set up a new plan for this organizer
        </DialogDescription>
      </DialogHeader>
      <AddPlanForm onSubmit={onAddPlan} onClose={onClose} />
    </DialogContent>
  </Dialog>
);

const RoleChangeDialog = ({ isOpen, onClose, onConfirm, currentRole }) => {
  const newRole = currentRole === "Organizer" ? "Admin" : "Organizer";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Account Role</DialogTitle>
          <DialogDescription>
            Are you sure you want to change this {"user's"} role from{" "}
            {currentRole} to {newRole}? This will affect their permissions and
            access levels.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Current Role:</span>
              <Badge variant="secondary">{currentRole}</Badge>
            </div>
            <span>→</span>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="font-medium">New Role:</span>
              <Badge variant="secondary">{newRole}</Badge>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(newRole)}>Confirm Change</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const OrganizerProfilePopup = ({ organizer, isOpen, onClose }) => {
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showAddPlanDialog, setShowAddPlanDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  if (!organizer) return null;
  const onAddPlan = () => {
    console.log("onAddPlan");
  };
  const onRoleChange = () => {
    console.log("onRoleChange");
  };
  const onBlock = () => {
    console.log("onBlock");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleRoleChange = (newRole) => {
    onRoleChange(newRole);
    setShowRoleDialog(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-start pr-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={organizer.photoUrl} />
                  <AvatarFallback>
                    {getInitials(
                      `${organizer.firstName} ${organizer.lastName}`
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl font-semibold">
                      {organizer.firstName} {organizer.lastName}
                    </DialogTitle>
                    <Badge variant="outline" className="ml-2">
                      {organizer.accountType}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">@{organizer.username}</p>
                </div>
              </div>
              {organizer.accountType != "Owner" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setShowRoleDialog(true)}
                >
                  <UserCog className="h-4 w-4" />
                  Change Role
                </Button>
              )}
            </div>
          </DialogHeader>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                {organizer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                Joined {formatDate(organizer.joinedAt)}
              </div>
            </div>

            <Tabs defaultValue="plans" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="plans">Current Plan</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                {/* <TabsTrigger value="history">Plan History</TabsTrigger> */}
              </TabsList>

              <TabsContent value="plans" className="mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Current Plan Details</h3>
                    {organizer.accountType != "Owner" && (
                      <Button onClick={() => setShowAddPlanDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Plan
                      </Button>
                    )}
                  </div>
                  {organizer.plan ? (
                    <div className="space-y-2">
                      <p>Max Capacity: {organizer.plan.maxCapacity}</p>
                      <p>Credits: {organizer.plan.credit}</p>
                      <p>Start Date: {formatDate(organizer.plan.startDate)}</p>
                      <p>
                        End Date:{" "}
                        {organizer.plan.endDate
                          ? formatDate(organizer.plan.endDate)
                          : "No end date"}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">No active plan</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-3">
                    {organizer.events?.map((event, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>{event}</span>
                      </li>
                    ))}
                    {(!organizer.events || organizer.events.length === 0) && (
                      <p className="text-gray-500 text-center">
                        No events found
                      </p>
                    )}
                  </ul>
                </div>
              </TabsContent>

              {/* <TabsContent value="history" className="mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-3">
                    {organizer.planHistory?.map((plan, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <History className="h-4 w-4 text-gray-400" />
                        <span>Plan with {plan.maxCapacity} capacity</span>
                        <span className="text-gray-500">
                          {formatDate(plan.startDate)}
                        </span>
                      </li>
                    ))}
                    {(!organizer.planHistory ||
                      organizer.planHistory.length === 0) && (
                      <p className="text-gray-500 text-center">
                        No history available
                      </p>
                    )}
                  </ul>
                </div>
              </TabsContent> */}
            </Tabs>

            <div className="flex justify-between mt-6 pt-4 border-t">
              {organizer.accountType != "Owner" && (
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => setShowBanDialog(true)}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Block Organizer
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BanConfirmationDialog
        isOpen={showBanDialog}
        onClose={() => setShowBanDialog(false)}
        onConfirm={onBlock}
      />

      <AddPlanDialog
        isOpen={showAddPlanDialog}
        onClose={() => setShowAddPlanDialog(false)}
        onAddPlan={onAddPlan}
      />

      <RoleChangeDialog
        isOpen={showRoleDialog}
        onClose={() => setShowRoleDialog(false)}
        onConfirm={handleRoleChange}
        currentRole={organizer.accountType}
      />
    </>
  );
};

export default OrganizerProfilePopup;
