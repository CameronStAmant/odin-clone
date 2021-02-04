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
        console.log('no name error');
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
    if (firebaseUser) {
      userId = auth.currentUser.uid;
      db.ref()
        .child('/users/' + userId + '/Foundations/Introduction')
        .set({
          'And working': false,
          'Get a computer': false,
          'Hop on Discord and introduce yourself': false,
          'Keep working': false,
          'Mark off lessons as you complete them': false,
        });
    } else {
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
