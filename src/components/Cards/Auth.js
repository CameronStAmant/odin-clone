import React, { useState } from 'react';
import { auth, fireb, db } from '../../services/firebase';

const Auth = () => {
  const [userId, setUserId] = useState(false);

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
      setUserId(auth.currentUser.uid);
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
    } else {
      setUserId(false);
    }
  });

  const signUpAnonymously = () => {
    auth.signInAnonymously();
  };

  return (
    <div>
      {userId && <button onClick={signOut}>Sign out</button>}
      {userId === false && (
        <button onClick={signUpGoogle}>Sign in with Google</button>
      )}
      {userId === false && (
        <button onClick={signUpAnonymously}>Sign up anonymously</button>
      )}
    </div>
  );
};

export default Auth;
