// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD-Q9YJudlLUhyQW12d6KlOHckBmJlcCTQ",
//   authDomain: "eat-protein-9a46c.firebaseapp.com",
//   projectId: "eat-protein-9a46c",
//   storageBucket: "eat-protein-9a46c.firebasestorage.app",
//   messagingSenderId: "220970432448",
//   appId: "1:220970432448:web:8f0c4ad15449c09ed67a25",
//   measurementId: "G-RLRXLL8S2G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDNAVIY9c_DcmxhBS2d6l_NTYwYKX2R7CI",
//   authDomain: "protein-1064f.firebaseapp.com",
//   projectId: "protein-1064f",
//   storageBucket: "protein-1064f.firebasestorage.app",
//   messagingSenderId: "912276945928",
//   appId: "1:912276945928:web:2adbfc0fb60920eb64a5bd"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// src/firebase.js

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDNAVIY9c_DcmxhBS2d6l_NTYwYKX2R7CI",
//   authDomain: "protein-1064f.firebaseapp.com",
//   projectId: "protein-1064f",
//   storageBucket: "protein-1064f.firebasestorage.app",
//   messagingSenderId: "912276945928",
//   appId: "1:912276945928:web:2adbfc0fb60920eb64a5bd",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// export default app;



// src/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";
import {
  getStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNAVIY9c_DcmxhBS2d6l_NTYwYKX2R7CI",
  authDomain: "protein-1064f.firebaseapp.com",
  projectId: "protein-1064f",
  storageBucket: "protein-1064f.firebasestorage.app",
  messagingSenderId: "912276945928",
  appId: "1:912276945928:web:2adbfc0fb60920eb64a5bd",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;