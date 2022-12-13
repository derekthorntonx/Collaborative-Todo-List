import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "collaborativetodo-78b23.firebaseapp.com",
  projectId: "collaborativetodo-78b23",
  storageBucket: "collaborativetodo-78b23.appspot.com",
  messagingSenderId: "1028295510525",
  appId: "1:1028295510525:web:47f72372f6f8eb8aeb3194"
};


const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    const name = result.user.displayName;
    const picture = result.user.photoURL;
    const email = result.user.email;
    const verified = result.user.emailVerified;
    localStorage.setItem('name', name);
    localStorage.setItem('picture', picture);
    localStorage.setItem('email', email);
    localStorage.setItem('verified', verified);
  }).catch((error) => console.log(error))
};
