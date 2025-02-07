import React from 'react';
import {  
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Ban,
  Edit,
  History,
  AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const OrganizerProfilePopup = ({ organizer, isOpen, onClose, onBlock, onEdit }) => {
  if (!organizer) return null;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={organizer.avatar} />
                <AvatarFallback>{getInitials(`${organizer.firstName} ${organizer.lastName}`)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  {organizer.firstName} {organizer.lastName}
                </DialogTitle>
                <p className="text-sm text-gray-500">@{organizer.username}</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              {organizer.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              {organizer.phone || 'No phone number'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              Joined {new Date(organizer.joinedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              Last active {new Date(organizer.lastActive).toLocaleDateString()}
            </div>
          </div>

          <Tabs defaultValue="plans" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                {organizer.plans?.length > 0 ? (
                  <ul className="space-y-3">
                    {organizer.plans.map((plan, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{plan.name}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(plan.date).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">No upcoming plans</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                {organizer.events?.length > 0 ? (
                  <ul className="space-y-3">
                    {organizer.events.map((event, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{event}</span>
                        <span className="text-sm text-gray-500">
                          {event.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">No events found</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                {organizer.history?.length > 0 ? (
                  <ul className="space-y-3">
                    {organizer.history.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <History className="h-4 w-4 text-gray-400" />
                        <span>{item.action}</span>
                        <span className="text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">No history available</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6 pt-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={onBlock}
              >
                <Ban className="h-4 w-4 mr-2" />
                Block Organizer
              </Button>
              {/* <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </Button> */}
            </div>
            {/* <Button variant="default">
              <AlertCircle className="h-4 w-4 mr-2" />
              Report Issue
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizerProfilePopup;