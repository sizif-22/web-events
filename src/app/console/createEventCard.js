import { Plus, Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const CreateEventCard = () => {
  const { accountType, plan } = useSelector((state) => state.user.userState);
  const { credit } = plan;
  const router = useRouter();
  const handleClick = () => {
    if (credit > 0 || accountType !== "Organizer") {
      router.push("/theme");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`group relative md:w-72 md:h-72 w-full h-56  ${
        credit > 0 || accountType !== "Organizer"
          ? "border-2 border-dashed hover:border-solid border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
          : "border-0 cursor-not-allowed bg-gray-800 "
      }  flex flex-col items-center justify-center space-y-2 transition-all duration-200 overflow-hidden`}
    >
      <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
      <span className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
        Create new event
      </span>

      <div
        className={`absolute  ${
          credit > 0 || accountType !== "Organizer" ? "hidden" : "flex"
        }  top-0 inset-0 backdrop-blur-sm flex-col items-center justify-center space-y-3 text-white`}
      >
        <div className="rounded-sm p-3">
          <Lock className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg">Quota Exceeded</span>
          <span className="text-sm text-gray-300 mt-1">
            Please upgrade your plan
          </span>
          <div
            className="absolute bottom-3 p-3 bg-gray-900 rounded cursor-pointer hover:p-4 transition-all duration-200 delay-75 hover:bottom-2 hover:shadow-md hover:shadow-white"
            onClick={() => {
              router.push("/account");
            }}
          >
            Go To Account Page
          </div>
        </div>
      </div>
    </Button>
  );
};

export default CreateEventCard;
