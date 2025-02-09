"use client";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Tag,
  Edit,
  Trash2,
  Share2,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { db } from "../firebase/firebase.user";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
const EventProfilePopup = ({ event, isOpen, onClose, onEdit, onDelete }) => {
  const [attendees, setAttendees] = useState(0);
  const capacity = 100;
  useEffect(() => {
    const getTotalParticipants = async () => {
      if (!event) return;
      const total = (
        await getDocs(collection(db, "events", event.id, "participants"))
      ).size;
      setAttendees(total);
    };
    getTotalParticipants();
  }, [event]);

  if (!event) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {event.featured && (
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    Featured
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-xl font-semibold">
                {event.title}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">Event ID: {event.id}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              {event.time || "Time TBD"}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {event.location || "Location TBD"}
            </div>
            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="h-4 w-4" />
              {event.price ? `$${event.price}` : "Free"}
            </div> */}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Capacity</span>
              </div>
              <span className="text-sm text-gray-600">
                {attendees}/{event.maxCapacity} seats filled
              </span>
            </div>
            <Progress value={(attendees / event.maxCapacity) * 100} />
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <div className="space-y-4">
                <div>
                  {/* <h3 className="font-medium mb-2">Description</h3> */}
                  {/* <p className="text-sm text-gray-600">{event.description}</p> */}
                </div>
                {event.categories?.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.categories.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded"
                        >
                          <Tag className="h-3 w-3" />
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {event.organizer && (
                  <div>
                    <h3 className="font-medium mb-2">Organizer</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        <p className="font-medium">{event.organizer.name}</p>
                        <p className="text-gray-500">{event.organizer.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="attendees" className="mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                {event.attendeeList?.length > 0 ? (
                  <div className="space-y-3">
                    {event.attendeeList.map((attendee, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-medium">{attendee.name}</p>
                            <p className="text-sm text-gray-500">
                              {attendee.email}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            attendee.status === "confirmed"
                              ? "bg-green-100"
                              : "bg-yellow-100"
                          }
                        >
                          {attendee.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">No attendees yet</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                {event.activity?.length > 0 ? (
                  <div className="space-y-3">
                    {event.activity.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div className="w-4 h-4 mt-0.5">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
                        </div>
                        <div>
                          <p>{item.action}</p>
                          <p className="text-gray-500">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    No activity recorded
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6 pt-4 border-t">
            <div className="flex gap-2">
              {/* <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Button> */}
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel Event
              </Button>
            </div>
            <div className="flex gap-2">
              {/* <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button> */}
              {/* <Button variant="default">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Issue
              </Button> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventProfilePopup;
