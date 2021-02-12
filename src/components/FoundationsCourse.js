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
  const [sectionTitles, setSectionTitles] = useState([[], []]);

  const prevUserId = usePrevious(userId);
  const prevFoundationsProgress = usePrevious(foundationsProgress);

  let currentNum = 0;

  const plusMinus = (sign) => {
    if (sign === '+') {
      setNumber((prevNumber) => prevNumber + 1);
    } else {
      setNumber((prevNumber) => prevNumber - 1);
    }
  };

  const updater = async (lesson, section) => {
    await db
      .ref()
      .child(`/users/${auth.currentUser.uid}/Courses/Foundations/`)
      .child(section)
      .update(lesson);

    await db
      .ref()
      .child(`/users/${auth.currentUser.uid}/Courses/Foundations/`)
      .once('value', (snapshot) => {
        let sections = snapshot.val();
        let arrOfTitles = [];
        for (const title of Object.entries(sections)) {
          arrOfTitles.push(title);
        }
        setSectionTitles(arrOfTitles);
        setFoundationsProgress(sections);
      });
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
      (foundationsProgress === '' &&
        userId === null &&
        prevUserId === undefined) ||
      reload === false
    ) {
      const initialRun = async () => {
        await db
          .ref()
          .child(`/users/notLoggedIn/Courses/Foundations/`)
          .once('value', (snapshot) => {
            let sections = snapshot.val();
            let arrOfTitles = [];
            for (const title of Object.entries(sections)) {
              arrOfTitles.push(title);
            }
            setSectionTitles(arrOfTitles);
            setFoundationsProgress(sections);
          });
      };
      initialRun();
      setReload(true);
    }

    if (
      (!_.isEqual(prevUserId, userId) &&
        userId !== null &&
        foundationsProgress !== '') ||
      (prevUserId === null && userId !== null)
    ) {
      const reRunner = async () => {
        await db
          .ref()
          .child(`/users/${userId}/Courses/`)
          .once('value', async (snapshot) => {
            if (snapshot.hasChild('/Foundations/')) {
              let sections = snapshot.val();
              let holder = [];
              for (const value of Object.entries(sections)) {
                holder.push(value);
              }
              setFoundationsProgress(holder[0][1]);
            } else {
              setTimeout(() => {
                reRunner();
              }, 200);
            }
          });

        if (reload !== true) {
          setReload(true);
        }
      };
      reRunner();
    }
    if (foundationsProgress !== '' && sectionTitles.length !== undefined) {
      let arrOfLessonValues = [];
      for (const value in foundationsProgress) {
        for (const [key, values] of Object.entries(
          foundationsProgress[value]
        )) {
          arrOfLessonValues.push(values);
        }
      }
      currentNum = 0;
      arrOfLessonValues.map((item) => {
        if (item === true) {
          currentNum += 1;
        } else {
        }
        return null;
      });
      if (currentNum / arrOfLessonValues.length !== number) {
        setNumber(currentNum / arrOfLessonValues.length);
      }
    }
  });
  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations course!</div>

        {userId && <div>{number * 100}%</div>}
        <ol>
          <LessonCard
            name="Introduction"
            description="This is the start of the rest of your career!"
            changePercentage={(sign) => plusMinus(sign)}
            userId={userId}
            foundationsProgress={Object.values(foundationsProgress)[0]}
            sectionTitles={sectionTitles[0][0]}
            updater={(lesson, section) => updater(lesson, section)}
            reload={reload}
            prevFoundationsProgress={prevFoundationsProgress}
          />

          <LessonCard
            name="Section 1"
            description="Let's get started"
            changePercentage={(sign) => plusMinus(sign)}
            userId={userId}
            foundationsProgress={Object.values(foundationsProgress)[1]}
            sectionTitles={sectionTitles[1][0]}
            updater={(lesson, section) => updater(lesson, section)}
            reload={reload}
            prevFoundationsProgress={prevFoundationsProgress}
          />
        </ol>
      </div>
    </div>
  );
};

export default FoundationsCourse;
