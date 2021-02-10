import Header from './HeaderFooter/Header';
import LessonCard from './Cards/LessonCard';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import _ from 'lodash';
import usePrevious from './usePrevious';

const FoundationsCourse = () => {
  const [number, setNumber] = useState(0);
  const [userId, setUserId] = useState(null);
  const [foundationsProgress, setFoundationsProgress] = useState('');
  const [reload, setReload] = useState(false);

  const prevUserId = usePrevious(userId);

  let currentNum = 0;
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
      .child(`/users/${auth.currentUser.uid}/Foundations`)
      .child('Introduction')
      .update(specificLesson);

    let c = [];
    await db
      .ref()
      .child(`/users/${auth.currentUser.uid}/Foundations`)
      .once('value', (snapshot) => {
        snapshot.forEach(function (child) {
          c.push(child.val());
        });
      });
    setFoundationsProgress(c);
  };

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        if (userId === null) {
          setUserId(auth.currentUser.uid);
        }
      } else {
        if (userId !== null) {
          setUserId(null);
          setReload(false);
        }
      }
    });

    if (
      foundationsProgress === '' &&
      userId === null &&
      prevUserId === undefined
    ) {
      const initialRun = async () => {
        let c = [];
        await db
          .ref()
          .child(`/users/notLoggedIn/Foundations`)
          .once('value', async (snapshot) => {
            snapshot.forEach((child) => {
              let getValue = child.val();
              getValue.value = child.val();
              c.push(getValue.value);
            });
            await Promise.all(c);
          });
        setFoundationsProgress(c);
      };
      initialRun();
    }

    if (
      (!_.isEqual(prevUserId, userId) &&
        userId !== null &&
        foundationsProgress !== '') ||
      (prevUserId === null && userId !== null)
    ) {
      const reRunner = async () => {
        let c = [];

        await db
          .ref()
          .child(`/users/${userId}/Foundations`)
          .once('value', async (snapshot) => {
            if (snapshot.hasChild('/Introduction/')) {
              snapshot.forEach((child) => {
                let getValue = child.val();
                getValue.value = child.val();
                c.push(getValue.value);
              });
            } else {
              setTimeout(() => {
                reRunner();
              }, 100);
            }
            await Promise.all(c);
          });

        setFoundationsProgress(c);

        if (reload !== true) {
          setReload(true);
        }
      };
      reRunner();
    }

    let cMap = [];
    if (foundationsProgress[0] !== undefined) {
      for (let [key, value] of Object.entries(foundationsProgress[0])) {
        cMap.push(value);
      }
      currentNum = 0;
      cMap.map((item) => {
        if (item === true) {
          currentNum += 1;
        } else {
        }
        return null;
      });
      if (currentNum !== number) {
        setNumber(currentNum);
      }
    }
  });

  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations course!</div>

        {userId && <div>{(number / lessons.length) * 100}%</div>}
        <ol>
          <LessonCard
            name="Introduction"
            description="This is the start of the rest of your career!"
            lessons={lessons}
            changePercentage={(sign) => plusMinus(sign)}
            userId={userId}
            foundationsProgress={foundationsProgress}
            updater={(lesson) => updater(lesson)}
            reload={reload}
          />
        </ol>
      </div>
    </div>
  );
};

export default FoundationsCourse;
