import { useState } from "react";
import { Trash2, Edit, Eye, Download, RefreshCcw } from "lucide-react";
import EventProfilePopup from "./EventProfilePopup";
import { cancelEvent } from "./funcs";
import { CancelEventDialog } from "./CancelEventDialog";
const formatTimestamp = ({ seconds }) => {
  const date = new Date(seconds * 1000);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds_part = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds_part}`;
};

const EventsTable = ({ events, onClick, onEdit, onDelete }) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [eventToCancel, setEventToCancel] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    if (onEdit) {
      onEdit(event);
    }
  };

  const handleDeleteEvent = (event) => {
    if (onDelete) {
      onDelete(event);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-semibold">Events</h2>
          <div className="flex gap-3 items-center">
            <RefreshCcw
              onClick={() => onClick()}
              className="active:-rotate-90 delay-75 duration-150 cursor-pointer"
            />
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Download size={16} />
              <p className="select-none">Export Data</p>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Event Name</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Organizer Email</th>
                  {/* <th className="p-4 text-left">Status</th> */}
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    // onClick={() => handleViewEvent(event)}
                  >
                    <td className="p-4">{event.title}</td>
                    <td className="p-4">{formatTimestamp(event.dateTime)}</td>
                    <td className="p-4">{event.organizer.email}</td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="View Details"
                          onClick={() => handleViewEvent(event)}
                        >
                          <Eye size={16} />
                        </button>
                        {/* <button
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                          title="Edit"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit size={16} />
                        </button> */}
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEventToCancel(event);
                            setShowCancelDialog(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>

                        {eventToCancel && (
                          <CancelEventDialog
                            isOpen={showCancelDialog}
                            onClose={() => {
                              setShowCancelDialog(false);
                              setEventToCancel(null);
                            }}
                            eventTitle={eventToCancel.title}
                            onConfirm={async () => {
                              const success = await cancelEvent(
                                eventToCancel.id,
                                eventToCancel.organizer.userId
                              );
                              if (success) {
                                setShowCancelDialog(false);
                                setEventToCancel(null);
                                onClick(); // Refresh the table
                              }
                            }}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EventProfilePopup
        event={selectedEvent}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onEdit={() => handleEditEvent(selectedEvent)}
        onDelete={() => handleDeleteEvent(selectedEvent)}
      />
    </>
  );
};

export default EventsTable;
