import firebaseAdmin from "firebase-admin";
import serviceAccount from "./admin.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: "https://volunteerish-ed549-default-rtdb.europe-west1.firebasedatabase.app",
  });
}

export { firebaseAdmin };
