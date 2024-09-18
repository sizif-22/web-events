import { app } from "./firebase.config";
import * as FireStorage from "firebase/storage";
import * as randomString from "randomstring";
import { updateUserWithEmail } from "./firebase.firestore";
// we need an updateProfileTmg function...

const storage = FireStorage.getStorage(app);

const uploadProfileImg = async ({ email, dir, file }) => {
  try {
    const storageRef = FireStorage.ref(
      storage,
      `${dir}/${randomString.generate(10)}`
    );
    const uploadTask = await FireStorage.uploadBytes(storageRef, file);

    const photoUrl = await FireStorage.getDownloadURL(uploadTask.ref);
    await updateUserWithEmail(email, { photoUrl });
    console.log("Profile image uploaded and user updated successfully.");
  } catch (err) {
    console.error("Error uploading profile image:", err);
  }
};

const uploadEventImage = async ({ dir, file }) => {
  try {
    const storageRef = FireStorage.ref(
      storage,
      `${dir}/${randomString.generate(10)}`
    );
    const uploadTask = await FireStorage.uploadBytes(storageRef, file);
    const photoUrl = await FireStorage.getDownloadURL(uploadTask.ref);
    return photoUrl;
  } catch (err) {
    console.error("Error uploading profile image:", err);
  }
};

export { uploadProfileImg, uploadEventImage };
