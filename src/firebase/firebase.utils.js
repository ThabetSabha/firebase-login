import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4_ys90_63jAJocjzkAAIC7fY1JV6jOFA",
  authDomain: "online-shop-b5f30.firebaseapp.com",
  databaseURL: "https://online-shop-b5f30.firebaseio.com",
  projectId: "online-shop-b5f30",
  storageBucket: "online-shop-b5f30.appspot.com",
  messagingSenderId: "38971018598",
  appId: "1:38971018598:web:dff66b8a1ff2812115cca7",
  measurementId: "G-ERM0W5K8ZZ",
};

firebase.initializeApp(firebaseConfig);

//for OAuth :

export const auth = firebase.auth();

//For Google auth:
export const googleProvider = new firebase.auth.GoogleAuthProvider();

//to get sign in popup when using the provider:
googleProvider.setCustomParameters({ prompt: "select_account" });

//Getting the current userAuth:
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    });
  });
};

//for creating users in firestore db :
export const firestore = firebase.firestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get(); //returns a document snapshot of the selected user.
  // console.log('userRef', userRef);
  // console.log('userSnap', userSnapshot);

  if (!userSnapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error Creating user profile", error);
    }
  }

  return userRef;
};