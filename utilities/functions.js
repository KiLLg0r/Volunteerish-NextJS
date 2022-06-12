import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const validateError = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return {
        type: "email",
        error: "Invalid email",
      };
    case "auth/email-already-in-use":
      return {
        type: "email",
        error: "Email is already in use",
      };
    case "auth/weak-password":
      return {
        type: "password",
        error: "Your password is too weak or is less than 6 characters long",
      };
    case "auth/user-disabled":
      return {
        type: "email",
        error: "This user account has been disabled",
      };
    case "auth/user-not-found":
      return {
        type: "email",
        error: "Email does not match any user",
      };
    case "auth/wrong-password":
      return {
        type: "password",
        error: "Wrong password",
      };
    default:
      return "";
  }
};

export const updateAllImages = async (uid, newURL) => {
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, {
    imgURL: newURL,
  });

  const announcesQuery = query(collection(db, "announces"), where("uid", "==", uid));
  const announcesSnapshot = await getDocs(announcesQuery);

  announcesSnapshot.forEach(async (announce) => {
    await updateDoc(doc(db, "announces", announce.id), {
      imgURL: newURL,
    });
  });

  const conversationQuery1 = query(collection(db, "conversations"), where("uid1", "==", uid));
  const conversationQuery1Snapshot = await getDocs(conversationQuery1);

  conversationQuery1Snapshot.forEach(async (conversation) => {
    await updateDoc(doc(db, "conversations", conversation.id), {
      imgURL1: newURL,
    });
  });

  const conversationQuery2 = query(collection(db, "conversations"), where("uid2", "==", uid));
  const conversationQuery2Snapshot = await getDocs(conversationQuery2);

  conversationQuery2Snapshot.forEach(async (conversation) => {
    await updateDoc(doc(db, "conversations", conversation.id), {
      imgURL2: newURL,
    });
  });
};
