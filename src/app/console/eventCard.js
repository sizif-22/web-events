import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const EventCard = ({ id, title, dateTime, location }) => {
  const router = useRouter();
  return (
    <Card className="md:w-72 md:h-72 w-full h-56 transition-all duration-200 hover:shadow-lg hover:border-[#00000050] relative">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold truncate">{title}</CardTitle>
        <div className="flex items-center text-gray-500 space-x-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {dateTime.toDate().toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {dateTime.toDate().toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm truncate">{location}</span>
        </div>
      </CardContent>

      <Button
        className="absolute right-3 bottom-3"
        onClick={() => {
          window.location.href = `/console/dashboard?id=${id}`;
        }}
      >
        View ▷
      </Button>
    </Card>
  );
};
export default EventCard;
