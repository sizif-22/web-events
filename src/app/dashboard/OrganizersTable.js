import { Ban, Eye, Download, RefreshCcw } from "lucide-react";
import { useState } from "react";
import OrganizerProfilePopup from "./OrganizerProfilePopup";

const OrganizersTable = ({ organizers, onClick }) => {
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleViewOrganizer = (organizer) => {
    setSelectedOrganizer(organizer);
    setIsProfileOpen(true);
  };

  const handleBlockOrganizer = async (organizer) => {
    // Implement block functionality
    console.log("Blocking organizer:", organizer.id);
  };

  const handleEditOrganizer = (organizer) => {
    // Implement edit functionality
    console.log("Editing organizer:", organizer.id);
    setIsProfileOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-semibold">Organizers</h2>
          <div className="flex gap-3 items-center">
            <RefreshCcw
              onClick={() => onClick()}
              className="active:-rotate-90 delay-75 duration-150 cursor-pointer "
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
                  <th className="p-4 text-left">Organizer Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Company</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizers.map((organizer) => (
                  <tr
                    key={organizer.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 cursor-pointer">
                      {organizer.firstName + " " + organizer.lastName}
                    </td>
                    <td className="p-4 cursor-pointer">{organizer.email}</td>
                    <td className="p-4 cursor-pointer">
                      {organizer.companyName || "-"}
                    </td>
                    <td className="p-4">
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="View Details"
                          onClick={() => handleViewOrganizer(organizer)}
                        >
                          <Eye size={16} />
                        </button>
                        {organizer.accountType != "Owner" ? (
                          <button
                            className="p-2 text-red-600  hover:bg-red-50 rounded"
                            title="Ban"
                          >
                            <Ban size={16} />
                          </button>
                        ) : (
                          <div
                            className="p-2 hover:bg-yellow-100 rounded cursor-default"
                            title="Owner"
                          >
                            👑
                          </div>
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

      <OrganizerProfilePopup
        organizer={selectedOrganizer}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onBlock={() => handleBlockOrganizer(selectedOrganizer)}
        onEdit={() => handleEditOrganizer(selectedOrganizer)}
      />
    </>
  );
};

export default OrganizersTable;
