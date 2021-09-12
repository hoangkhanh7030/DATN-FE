import { IMAGES_URL } from "constants/index";
import { storage } from "firebase/index";
import { setMessage } from "redux/actions/msgAction";
import { useDispatch } from "react-redux";

export const getUploadedImageUrl = async (avatarFile) => {
  return new Promise((resolve, reject) => {
    const uploadTask = storage
      .ref(`${IMAGES_URL}${avatarFile.name}`)
      .put(avatarFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        useDispatch(setMessage(error));
        reject(error);
      },
      async () => {
        const imgURL = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(imgURL);
        return imgURL;
      }
    );
  });
};
