import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.user";

const EventParticipants = ({ Events }) => {
  const [participantsData, setParticipantsData] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await Promise.all(
        Events.map(async (eventId) => {
          const { docs } = await getDocs(
            collection(db, "events", eventId, "participants")
          );
          return {
            eventId,
            count: docs.length,
          };
        })
      );
      setParticipantsData(data);
    };

    fetchParticipants();
  }, [Events]);

  return (
    <div className="bg-white shadow-md rounded-lg text-center mt-6 p-6">
      {participantsData.map(({ eventId, count }) => (
        <div className="flex items-center gap-2 p-2" key={eventId}>
          <div className="grid grid-cols-5 gap-2">
            <p className="col-span-2 text-left">{eventId}:</p>
            <div className="col-span-3 flex items-center gap-2">
              <p>{count}</p>
              <StyledWrapper>
                <div
                  className="loader block w-[130px] h-1 rounded-[30px] bg-[rgba(0,0,0,0.2)] relative before:content-[''] before:absolute before:bg-[#0071e2] before:top-0 before:left-0 before:h-full before:rounded-[30px]"
                  style={{
                    "--tw-loader-width": `${(count * 100) / 100}%`,
                  }}
                />
              </StyledWrapper>
              <p>100</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const StyledWrapper = styled.div`
  .loader::before {
    width: var(--tw-loader-width);
    animation: moving 1s ease-in-out;
  }
`;

export default EventParticipants;
