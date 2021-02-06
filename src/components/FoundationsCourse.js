import Header from './HeaderFooter/Header';
import LessonCard from './Cards/LessonCard';
import React, { useState } from 'react';
import { auth, db } from '../services/firebase';

const FoundationsCourse = () => {
  const [number, setNumber] = useState(0);
  const [isLoggedIn, setisLoggedIn] = useState('');
  const [userId, setUserId] = useState('');
  const [foundationsProgress, setFoundationsProgress] = useState('');

  const lessons = [
    'Get a computer',
    'Hop on Discord and introduce yourself',
    'Mark off lessons as you complete them',
    'Keep working',
    'And working',
  ];

  const plusMinus = (sign) => {
    if (sign === '+') {
      setNumber((prevNumber) => prevNumber + 1);
    } else {
      setNumber((prevNumber) => prevNumber - 1);
    }
  };

  const updater = async (specificLesson) => {
    db.ref()
      .child('/users/' + auth.currentUser.uid + '/Foundations')
      .child('Introduction')
      .update(specificLesson);

    let c = [];
    await db
      .ref()
      .child('/users/' + auth.currentUser.uid + '/Foundations')
      .once('value', (snapshot) => {
        snapshot.forEach(function (child) {
          c.push(child.val());
        });
      });
    setFoundationsProgress(c);
  };

  auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      if (foundationsProgress === '') {
        let cMap = [];
        let c = [];
        await db
          .ref()
          .child('/users/' + auth.currentUser.uid + '/Foundations')
          .once('value', async (snapshot) => {
            snapshot.forEach((child) => {
              let stuff = child.val();
              stuff.value = child.val();
              c.push(stuff.value);
            });
            await Promise.all(c);

            for (let [key, value] of Object.entries(c)) {
              cMap.push(value);
            }
          });
        setFoundationsProgress(c);
        let currentNum = 0;
        cMap.map((item) => {
          if (item === true) {
            currentNum += 1;
          } else {
          }
          return null;
        });
        setNumber(currentNum);
      }

      if (userId === '') {
        setUserId(auth.currentUser.uid);
      }

      if (isLoggedIn === '') {
        setisLoggedIn(true);
      }
    } else {
      if (isLoggedIn !== false) {
        if (userId === '') {
          setUserId(false);
        }

        if (foundationsProgress === '') {
          let c = [];
          await db
            .ref()
            .child('/users/notLoggedIn/Foundations')
            .once('value', (snapshot) => {
              snapshot.forEach(function (child) {
                c.push(child.val());
              });
            });
          setFoundationsProgress(c);
        }

        if (isLoggedIn === '') {
          setisLoggedIn(false);
        }
      }
    }
  });

  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations course!</div>

        {isLoggedIn && <div>{(number / lessons.length) * 100}%</div>}
        <ol>
          <LessonCard
            name="Introduction"
            description="This is the start of the rest of your career!"
            lessons={lessons}
            changePercentage={(sign) => plusMinus(sign)}
            isLoggedIn={isLoggedIn}
            userId={userId}
            foundationsProgress={foundationsProgress}
            updater={(lesson) => updater(lesson)}
          />
        </ol>
      </div>
    </div>
  );
};

export default FoundationsCourse;
