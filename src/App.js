/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import "./App.scss";
import SignIn from "./components/sign-in/sign-in.component";
import CreateUserForm from "./components/create-user-form/create-user-form.component";
import Spinner from "./components/spinner/spinner.component";
import Header from "./components/header/header.component";

import {
  auth,
  getCurrentUser,
  createUserProfileDocument,
} from "./firebase/firebase.utils";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  // Checks if a user is already logged in to firebase, then changes the loading state to false
  const checkUserSession = async () => {
    try {
      const userAuth = await getCurrentUser();
      if (!userAuth) {
        setIsLoading(false);
        return;
      }
      await getUserSnapshotFromUserAuthAndSignIn(userAuth);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      setIsLoading(true);
      await getUserSnapshotFromUserAuthAndSignIn(user);
      setIsError(null);
    } catch (error) {
      console.log(error);
      setIsError(error);
    }
  };

  // Checks if the provided info is valid, if so signs the user in, and loads it into state.
  const getUserSnapshotFromUserAuthAndSignIn = async (userAuth) => {
    try {
      const userRef = await createUserProfileDocument(userAuth);
      const userSnapshot = await userRef.get();
      setUser({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      });
      setIsLoading(false);
      setIsError(null);
    } catch (error) {
      console.log(error);
      setIsError(error);
      setIsLoading(false);
    }
  };

  // Sign user out of firebase.
  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkUserSession();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header signOut={signOut} user={user} />
          <Switch>
            <Route
              exact
              path="/signin"
              render={() =>
                user ? (
                  <Redirect to="/" />
                ) : (
                  <SignIn signInWithEmail={signInWithEmail} isError={isError} />
                )
              }
            />
            <Route
              path="/"
              render={() =>
                user === null ? <Redirect to="/signin" /> : <CreateUserForm />
              }
            />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
