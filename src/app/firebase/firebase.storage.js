import { app } from "./firebase.config";
import * as FireStorage from "firebase/storage";
import * as randomString from "randomstring";
import { updateUser } from "./firebase.firestore";

const storage = FireStorage.getStorage(app);

const uploadProfileImg = async (dir, file) => {
  try {
    const storageRef = FireStorage.ref(
      storage,
      `${dir}/${randomString.generate(10)}`
    );

    const uploadTask = await FireStorage.uploadBytes(storageRef, file);

    const photoUrl = await FireStorage.getDownloadURL(uploadTask.ref);

    await updateUser({ photoUrl });

    console.log("Profile image uploaded and user updated successfully.");
  } catch (err) {
    console.error("Error uploading profile image:", err);
  }
};

export { uploadProfileImg };
