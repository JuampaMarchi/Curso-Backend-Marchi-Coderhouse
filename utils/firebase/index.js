
import {createRequire} from "module";

const require = createRequire(import.meta.url)
const serviceAccount = require("./config/curso-backend-dbb64-firebase-adminsdk-119gx-49c5c456bb.json")
const admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore()




