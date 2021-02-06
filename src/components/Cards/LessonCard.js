import './LessonCard.css';
// import { db } from '../../services/firebase';
import React, { useState } from 'react';

const LessonCard = (props) => {
  const [loadLessons, setLoadLessons] = useState(true);
  const [loadAuthlessLessons, setLoadAuthlessLessons] = useState([]);

  let lessons = '';
  let authlessLessons;
  let choice;

  const updateDatabase = async (lesson) => {
    const specificLesson = {};
    if (props.foundationsProgress[0][lesson] === false) {
      specificLesson[lesson] = true;
      props.changePercentage('+');
    } else {
      specificLesson[lesson] = false;
      props.changePercentage('-');
    }
    await props.updater(specificLesson);
    setLoadLessons(true);
  };

  const buttonUpdater = () => {
    lessons = props.lessons.map((item) => {
      if (
        props.foundationsProgress !== '' &&
        props.foundationsProgress.length !== 0
      ) {
        if (props.foundationsProgress[0][item] === false) {
          choice = <button onClick={() => updateDatabase(item)}>Mark</button>;
        } else {
          choice = <button onClick={() => updateDatabase(item)}>Unmark</button>;
        }
      } else {
        choice = 'no';
      }

      return (
        <div key={item} className="lesson">
          <li>{item}</li>
          {choice}
        </div>
      );
    });

    authlessLessons = props.lessons.map((item) => {
      return (
        <div key={item} className="lesson">
          <li>{item}</li>
        </div>
      );
    });
    if (loadLessons === true && choice !== 'no') {
      setLoadLessons(lessons);
      setLoadAuthlessLessons(authlessLessons);
    }
  };

  buttonUpdater();

  return (
    <div className="lessonCard">
      <div className="lessonTop">
        <div>
          <div className="lessonName">{props.name}</div>
          <div>{props.description}</div>
        </div>
      </div>
      <div className="listLesson">
        {props.isLoggedIn ? loadLessons : loadAuthlessLessons}
      </div>
    </div>
  );
};

export default LessonCard;
