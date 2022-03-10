import { initializeApp } from "firebase/app";
import { getAuth ,onAuthStateChanged} from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getDatabase} from "firebase/database"
// Your web app's Firebase configuration
import {getMessaging} from "firebase/messaging"  

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket:process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage=getStorage(app)
const db=getDatabase(app)
const messaging = getMessaging(app);
onAuthStateChanged(auth,(user)=>{
  user? localStorage.setItem("login",true):localStorage.setItem("login",false);
})
export default app
export {auth,storage,db,messaging}