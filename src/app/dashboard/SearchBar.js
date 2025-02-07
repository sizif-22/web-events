import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, Calendar, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import OrganizerProfilePopup from './OrganizerProfilePopup';
import EventProfilePopup from './EventProfilePopup';

const SearchBar = ({ organizers, events, onEventEdit, onEventDelete }) => {
  const [result, setResult] = useState({ orgs: [], events: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOrganizerProfileOpen, setIsOrganizerProfileOpen] = useState(false);
  const [isEventProfileOpen, setIsEventProfileOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
      setResult({ orgs: [], events: [] });
      return;
    }

    const filteredOrgs = organizers.filter(organizer => 
      organizer.firstName?.toLowerCase().includes(term) ||
      organizer.lastName?.toLowerCase().includes(term) ||
      organizer.email?.toLowerCase().includes(term)
    );

    const filteredEvents = events.filter(event =>
      event.id?.toLowerCase().includes(term) ||
      event.title?.toLowerCase().includes(term) ||
      event.description?.toLowerCase().includes(term)
    );

    setResult({
      orgs: filteredOrgs.slice(0, 5),
      events: filteredEvents.slice(0, 5)
    });
  }, [searchTerm, organizers, events]);

  const handleSearchFocus = () => {
    setIsActive(true);
  };

  const handleClear = () => {
    setSearchTerm("");
    setIsActive(false);
  };

  const handleOrganizerClick = (organizer) => {
    setSelectedOrganizer(organizer);
    setIsOrganizerProfileOpen(true);
    setIsActive(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventProfileOpen(true);
    setIsActive(false);
  };

  const handleBlockOrganizer = async (organizer) => {
    // Implement block functionality
    console.log("Blocking organizer:", organizer.id);
  };

  const handleEditOrganizer = (organizer) => {
    // Implement edit functionality
    console.log("Editing organizer:", organizer.id);
    setIsOrganizerProfileOpen(false);
  };

  const handleEventEdit = (event) => {
    if (onEventEdit) {
      onEventEdit(event);
    }
    setIsEventProfileOpen(false);
  };

  const handleEventDelete = (event) => {
    if (onEventDelete) {
      onEventDelete(event);
    }
    setIsEventProfileOpen(false);
  };

  return (
    <>
      <div className="relative mb-6" ref={searchRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Search events, organizers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleSearchFocus}
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="text-gray-400 hover:text-gray-600 transition-colors" size={20} />
            </button>
          )}
        </div>

        {isActive && (searchTerm || result.orgs.length > 0 || result.events.length > 0) && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
            {(result.orgs.length === 0 && result.events.length === 0) ? (
              <div className="p-4 text-gray-500 text-center">
                No results found for &#34;{searchTerm}&#34;
              </div>
            ) : (
              <>
                {result.orgs.length > 0 && (
                  <div className="border-b border-gray-100 last:border-0">
                    <div className="px-4 py-2 bg-gray-50 text-sm font-semibold text-gray-700">
                      Organizers
                    </div>
                    {result.orgs.map((organizer) => (
                      <div
                        key={organizer.id}
                        onClick={() => handleOrganizerClick(organizer)}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer group transition-colors"
                      >
                        <User className="text-gray-400 mr-3" size={20} />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {organizer.firstName} {organizer.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{organizer.email}</div>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-gray-600" size={16} />
                      </div>
                    ))}
                  </div>
                )}

                {result.events.length > 0 && (
                  <div className="border-b border-gray-100 last:border-0">
                    <div className="px-4 py-2 bg-gray-50 text-sm font-semibold text-gray-700">
                      Events
                    </div>
                    {result.events.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer group transition-colors"
                      >
                        <Calendar className="text-gray-400 mr-3" size={20} />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {event.title || event.id}
                          </div>
                          {event.description && (
                            <div className="text-sm text-gray-500 truncate">
                              {event.description}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-gray-600" size={16} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <OrganizerProfilePopup
        organizer={selectedOrganizer}
        isOpen={isOrganizerProfileOpen}
        onClose={() => setIsOrganizerProfileOpen(false)}
        onBlock={() => handleBlockOrganizer(selectedOrganizer)}
        onEdit={() => handleEditOrganizer(selectedOrganizer)}
      />

      <EventProfilePopup
        event={selectedEvent}
        isOpen={isEventProfileOpen}
        onClose={() => setIsEventProfileOpen(false)}
        onEdit={() => handleEventEdit(selectedEvent)}
        onDelete={() => handleEventDelete(selectedEvent)}
      />
    </>
  );
};

export default SearchBar;