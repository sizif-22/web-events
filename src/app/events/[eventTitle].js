import { useRouter } from "next/router";
import { getEventByTitle } from "@/app/firebase/firestore.events";

const EventPage = ({ event }) => {
  const router = useRouter();
  const { eventTitle } = router.query;

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Organized by: {event.organizer}</p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const event = await getEventByTitle(params.eventTitle);

  return {
    props: {
      event: event || null,
    },
  };
}

export default EventPage;
