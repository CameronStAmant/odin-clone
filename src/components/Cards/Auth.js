import React, { useState } from 'react';
import { auth, fireb, db } from '../../services/firebase';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let userId;

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const signUp = () => {
    auth.createUserWithEmailAndPassword(username, password);
  };

  const login = () => {
    auth.signInWithEmailAndPassword(username, password);
  };

  const signOut = () => {
    auth.signOut();
  };

  const signUpGoogle = () => {
    const provider = new fireb.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  auth.onAuthStateChanged((firebaseUser) => {
    let template;
    if (firebaseUser) {
      userId = auth.currentUser.uid;
      db.ref()
        .child(`/users/${userId}`)
        .once('value', (snapshot) => {
          if (snapshot.hasChild('/Courses/')) {
          } else {
            const templateGrabber = async () => {
              await db
                .ref()
                .child('/Courses/')
                .once('value', (templateSnapshot) => {
                  template = templateSnapshot.val();
                });
              await db
                .ref()
                .child(`/users/${userId}`)
                .child('/Courses/')
                .set(template);
            };
            templateGrabber();
          }
        });
    }
  });

  const signUpAnonymously = () => {
    auth.signInAnonymously();
  };

  return (
    <div>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => handleChange(event)}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={password}
          onChange={(event) => handleChange(event)}
        />
      </label>
      <button onClick={signUp}>Sign up</button>
      <button onClick={login}>Sign in</button>
      <button onClick={signOut}>Sign out</button>
      <button onClick={signUpGoogle}>Google</button>
      <button onClick={signUpAnonymously}>Sign up anonymously</button>
    </div>
  );
};

export default Auth;
