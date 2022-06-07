import { collection, query, where, getDocs, getFirestore, orderBy, limit, startAfter } from "firebase/firestore";
import { app } from "../config/firebase";

const db = getFirestore(app);

const userAnnouncesFirstFetch = async (UID, status) => {
  const Query = query(
    collection(db, "announces"),
    where("uid", "==", UID),
    where("status", "==", status),
    orderBy("posted", "desc"),
    limit(5),
  );

  try {
    const announcesSnapshot = await getDocs(Query);

    let announces = [];
    let lastKey = "";

    announcesSnapshot.forEach((announce) => {
      announces.push({
        ID: announce.id,
        data: announce.data(),
      });
      lastKey = announce.data().posted;
    });

    return { announces, lastKey };
  } catch (error) {
    console.error(error);
  }
};

const helperUserAnnouncesFirstFetch = async (UID, status) => {
  const Query = query(
    collection(db, "announces"),
    where("uid", "!=", UID),
    where("helpingBy", "==", UID),
    where("status", "==", status),
    orderBy("uid", "desc"),
    orderBy("posted", "desc"),
    limit(5),
  );

  try {
    const announcesSnapshot = await getDocs(Query);

    let announces = [];
    let lastKey = "";

    announcesSnapshot.forEach((announce) => {
      announces.push({
        ID: announce.id,
        data: announce.data(),
      });
      lastKey = announce.data().posted;
    });

    return { announces, lastKey };
  } catch (error) {
    console.error(error);
  }
};

const announcesFirstFetch = async (UID) => {
  const Query = query(
    collection(db, "announces"),
    where("uid", "!=", UID),
    where("status", "==", "active"),
    orderBy("status", "desc"),
    orderBy("posted", "desc"),
    limit(5),
  );

  try {
    const announcesSnapshot = await getDocs(Query);

    let announces = [];
    let lastKey = "";

    announcesSnapshot.forEach((announce) => {
      announces.push({
        ID: announce.id,
        data: announce.data(),
      });
      lastKey = announce.data().posted;
    });

    return { announces, lastKey };
  } catch (error) {
    console.error(error);
  }
};
const announcesNextFetch = async (UID, key) => {
  const Query = query(
    collection(db, "announces"),
    where("uid", "!=", UID),
    where("status", "==", "active"),
    orderBy("status", "desc"),
    orderBy("posted", "desc"),
    startAfter(key),
    limit(5),
  );

  try {
    const announcesSnapshot = await getDocs(Query);

    let announces = [];
    let lastKey = "";

    announcesSnapshot.forEach((announce) => {
      announces.push({
        ID: announce.id,
        data: announce.data(),
      });
      lastKey = doc.data().posted;
    });

    return { announces, lastKey };
  } catch (error) {
    console.error(error);
  }
};

const exportedFunctions = {
  userAnnouncesFirstFetch,
  announcesFirstFetch,
  announcesNextFetch,
  helperUserAnnouncesFirstFetch,
};

export default exportedFunctions;
