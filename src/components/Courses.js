import Header from './HeaderFooter/Header';
import LessonCard from './Cards/LessonCard';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import _ from 'lodash';
import usePrevious from './usePrevious';

const Course = (props) => {
  const [number, setNumber] = useState(0);
  const [userId, setUserId] = useState(null);
  const [courseProgress, setCourseProgress] = useState('');
  const [reload, setReload] = useState(false);
  const [sectionTitles, setSectionTitles] = useState(props.lessonArrays);
  const [lessonCards, setLessonCards] = useState('');

  const prevUserId = usePrevious(userId);
  const prevCourseProgress = usePrevious(courseProgress);

  let currentNum = 0;

  const lessonGenerator = () => {
    let lessonCount = parseInt(props.lessonCount);
    let arrOfLessonCards = [];

    for (let i = 0; i < lessonCount; i++) {
      arrOfLessonCards.push(
        <LessonCard
          key={i}
          name={props.lessonName[i]}
          description={props.lessonDescription[i]}
          changePercentage={(sign) => plusMinus(sign)}
          userId={userId}
          courseProgress={Object.values(courseProgress)[i]}
          sectionTitles={sectionTitles[i][0]}
          updater={(lesson, section) => updater(lesson, section)}
          reload={reload}
          prevCourseProgress={prevCourseProgress}
        />
      );
    }
    setLessonCards(arrOfLessonCards);
  };

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
      .child(`/users/${userId}/Courses/${props.url}/`)
      .child(section)
      .update(lesson);

    await db
      .ref()
      .child(`/users/${userId}/Courses/${props.url}/`)
      .once('value', (snapshot) => {
        let sections = snapshot.val();
        let arrOfTitles = [];
        for (const title of Object.entries(sections)) {
          arrOfTitles.push(title);
        }
        setSectionTitles(arrOfTitles);
        setCourseProgress(sections);
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
      (courseProgress === '' && userId === null && prevUserId === undefined) ||
      reload === false
    ) {
      const initialRun = async () => {
        await db
          .ref()
          .child(`/users/notLoggedIn/Courses/${props.url}/`)
          .once('value', (snapshot) => {
            let sections = snapshot.val();
            let arrOfTitles = [];
            for (const title of Object.entries(sections)) {
              arrOfTitles.push(title);
            }
            setSectionTitles(arrOfTitles);
            setCourseProgress(sections);
          });
      };
      initialRun();
      setReload(true);
    }

    if (
      (!_.isEqual(prevUserId, userId) &&
        userId !== null &&
        courseProgress !== '') ||
      (prevUserId === null && userId !== null)
    ) {
      const reRunner = async () => {
        await db
          .ref()
          .child(`/users/${userId}/Courses/${props.url}`)
          .once('value', async (snapshot) => {
            if (snapshot.hasChildren()) {
              let sections = snapshot.val();
              let arrOfTitles = [];
              for (const title of Object.entries(sections)) {
                arrOfTitles.push(title);
              }
              setSectionTitles(arrOfTitles);
              setCourseProgress(sections);
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
    if (courseProgress !== '' && sectionTitles.length !== undefined) {
      let arrOfLessonValues = [];
      for (const value in courseProgress) {
        for (const [key, values] of Object.entries(courseProgress[value])) {
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
        setNumber((currentNum / arrOfLessonValues.length) * 100);
      }
    }
    if (
      !_.isEqual(prevCourseProgress, courseProgress) ||
      prevUserId !== userId
    ) {
      lessonGenerator();
    }
  });
  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">{props.name} course!</div>

        {userId && <div>{number}%</div>}
        <ol>{lessonCards}</ol>
      </div>
    </div>
  );
};

export default Course;
