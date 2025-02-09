import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
const ImageCard = ({formData ,handleProfilePicture,handleSkip,handleFileChange,fileError,isThereImg }) => {

  return (
    <div>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {formData.profilePicture && isThereImg ? (
                <img
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <Label
              htmlFor="profilePicture"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Label>
            <Input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {fileError && (
              <p className="text-red-500 text-sm text-center">{fileError}</p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={handleProfilePicture} className="flex-1 mr-2">
          Complete
        </Button>
        <Button variant="outline" onClick={handleSkip} className="flex-1 ml-2">
          Skip
        </Button>
      </CardFooter>
    </div>
  );
};
export default ImageCard;
