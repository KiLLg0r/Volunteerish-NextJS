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

export function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "k", "m", "b", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat((suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision));
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
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
