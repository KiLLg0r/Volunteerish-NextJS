import nookies from "nookies";
import { firebaseAdmin } from "../config/firebaseAdmin";
import { doc, getDoc, query, collection, orderBy, getDocs } from "firebase/firestore";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    console.log(user);

    let initialUserData = [];
    let users = [];

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) initialUserData = userSnap.data();

    const q = query(collection(db, "users"), orderBy("points", "desc"));
    const usersSnapshot = await getDocs(q);

    usersSnapshot.forEach((user) => {
      users.push({
        id: user.id,
        data: user.data(),
      });
    });

    return {
      props: { initialUserData, users },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
