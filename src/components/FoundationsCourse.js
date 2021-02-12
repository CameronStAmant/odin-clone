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

  let currentNum = 0;

  let lessons = [];

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
      .child(`/users/${auth.currentUser.uid}/Courses/Foundations`)
      .child(section)
      .update(lesson);

    let c = [];
    await db
      .ref()
      .child(`/users/${auth.currentUser.uid}/Courses/Foundations`)
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
        await db
          .ref()
          .child(`/users/notLoggedIn/Courses/Foundations`)
          .once('value', (snapshot) => {
            let sections = snapshot.val();
            let arrOfTitles = [];
            for (const title of Object.entries(sections)) {
              arrOfTitles.push(title);
            }
            console.log(arrOfTitles[1][0]);
            setSectionTitles(arrOfTitles);
            setFoundationsProgress(sections);
          });
      };
      initialRun();
    }

    // if (auth.currentUser !== null) {
    //   const getLessons = async () => {
    //     await db
    //       .ref()
    //       .child(`/users/${auth.currentUser.uid}/Foundations`)
    //       .once('value', (snapshot) => {
    //         let sections = snapshot.val();
    //         console.log(sections);
    //         setFoundationsProgress(sections);
    //       });
    //   };
    //   getLessons();
    // }

    if (
      (!_.isEqual(prevUserId, userId) &&
        userId !== null &&
        foundationsProgress !== '') ||
      (prevUserId === null && userId !== null)
    ) {
      const reRunner = async () => {
        // let c = [];

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
            // await Promise.all(c);
          });

        // setFoundationsProgress(c);

        if (reload !== true) {
          setReload(true);
        }
      };
      reRunner();
    }

    // let cMap = [];
    // if (foundationsProgress[0] !== undefined) {
    //   for (let [key, value] of Object.entries(foundationsProgress[0])) {
    //     cMap.push(value);
    //   }
    //   currentNum = 0;
    //   cMap.map((item) => {
    //     if (item === true) {
    //       currentNum += 1;
    //     } else {
    //     }
    //     return null;
    //   });
    //   if (currentNum !== number) {
    //     setNumber(currentNum);
    //   }
    // }
  });

  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations course!</div>

        {/* {userId && <div>{(number / lessons.length) * 100}%</div>} */}
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
          />
        </ol>
      </div>
    </div>
  );
};

export default FoundationsCourse;
