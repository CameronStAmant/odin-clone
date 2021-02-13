import './LessonCard.css';
import React, { useState, useEffect } from 'react';
import usePrevious from '../usePrevious';

const LessonCard = (props) => {
  const [loadLessons, setLoadLessons] = useState(true);
  const [loadAuthlessLessons, setLoadAuthlessLessons] = useState([]);
  const [lessonValues, setLessonValues] = useState([]);
  const [lessonNames, setLessonNames] = useState([]);

  const prevUserId = usePrevious(props.userId);

  let lessons = '';
  let authlessLessons;
  let choice;

  const updateDatabase = async (lesson, section) => {
    const specificLesson = {};
    let indexFinder = lessonNames.indexOf(lesson);
    if (lessonValues[indexFinder] === false) {
      specificLesson[lessonNames[indexFinder]] = true;
      props.changePercentage('+');
    } else {
      specificLesson[lessonNames[indexFinder]] = false;
      props.changePercentage('-');
    }
    await props.updater(specificLesson, section);
    setLoadLessons(true);
  };

  const buttonUpdater = () => {
    let arrOfLessonValues = [];
    let arrOfLessonNames = [];
    for (const value in props.courseProgress) {
      arrOfLessonValues.push(props.courseProgress[value]);
      arrOfLessonNames.push(value);
    }
    lessons = arrOfLessonValues.map((item, index) => {
      if (props.courseProgress !== '' && props.courseProgress.length !== 0) {
        if (item === false) {
          choice = (
            <button
              onClick={() =>
                updateDatabase(arrOfLessonNames[index], props.sectionTitles)
              }
            >
              Mark
            </button>
          );
        } else {
          choice = (
            <button
              onClick={() =>
                updateDatabase(arrOfLessonNames[index], props.sectionTitles)
              }
            >
              Unmark
            </button>
          );
        }
      } else {
        choice = 'no';
      }

      return (
        <div key={arrOfLessonNames[index]} className="lesson">
          <ul>{arrOfLessonNames[index]}</ul>
          {choice}
        </div>
      );
    });

    authlessLessons = arrOfLessonValues.map((item, index) => {
      return (
        <div key={arrOfLessonNames[index]} className="lesson">
          <ul>{arrOfLessonNames[index]}</ul>
        </div>
      );
    });

    if (loadLessons === true && choice !== 'no') {
      setLoadLessons(lessons);
      setLoadAuthlessLessons(authlessLessons);
      setLessonValues(arrOfLessonValues);
      setLessonNames(arrOfLessonNames);
    }
  };

  if (props.courseProgress !== undefined) {
    buttonUpdater();
  }
  useEffect(() => {
    if (prevUserId !== props.userId || props.reload === true) {
      setLoadLessons(true);
    }
  }, [prevUserId, props.userId, props.reload, props.prevCourseProgress]);

  return (
    <div className="lessonCard">
      <div className="lessonTop">
        <div>
          <div className="lessonName">{props.name}</div>
          <div>{props.description}</div>
        </div>
      </div>
      <div className="listLesson">
        {props.userId ? loadLessons : loadAuthlessLessons}
      </div>
    </div>
  );
};

export default LessonCard;
