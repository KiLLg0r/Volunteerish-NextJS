import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import languages from "./languages.json";

export const validateError = (errorCode) => {
  const language = localStorage.getItem("language");
  switch (errorCode) {
    case "auth/invalid-email":
      return {
        type: "email",
        error: languages[language].errorValidation.invalidEmail,
      };
    case "auth/email-already-in-use":
      return {
        type: "email",
        error: languages[language].errorValidation.alreadyInUse,
      };
    case "auth/weak-password":
      return {
        type: "password",
        error: languages[language].errorValidation.weakPass,
      };
    case "auth/user-disabled":
      return {
        type: "email",
        error: languages[language].errorValidation.userDisabled,
      };
    case "auth/user-not-found":
      return {
        type: "email",
        error: languages[language].errorValidation.notFound,
      };
    case "auth/wrong-password":
      return {
        type: "password",
        error: languages[language].errorValidation.wrongPass,
      };
    default:
      return "";
  }
};

export function abbreviateNumber(number) {
  var s = ["", "K", "M", "B", "T", "P", "E"];
  const tier = (Math.log10(number) / 3) | 0;

  if (tier == 0) return number;

  const suffix = s[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}

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

export const updateAllNames = async (uid, newName) => {
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, {
    name: newName,
  });

  const announcesQuery = query(collection(db, "announces"), where("uid", "==", uid));
  const announcesSnapshot = await getDocs(announcesQuery);

  announcesSnapshot.forEach(async (announce) => {
    await updateDoc(doc(db, "announces", announce.id), {
      name: newName,
    });
  });

  const conversationQuery1 = query(collection(db, "conversations"), where("uid1", "==", uid));
  const conversationQuery1Snapshot = await getDocs(conversationQuery1);

  conversationQuery1Snapshot.forEach(async (conversation) => {
    await updateDoc(doc(db, "conversations", conversation.id), {
      name1: newName,
    });
  });

  const conversationQuery2 = query(collection(db, "conversations"), where("uid2", "==", uid));
  const conversationQuery2Snapshot = await getDocs(conversationQuery2);

  conversationQuery2Snapshot.forEach(async (conversation) => {
    await updateDoc(doc(db, "conversations", conversation.id), {
      name2: newName,
    });
  });
};
