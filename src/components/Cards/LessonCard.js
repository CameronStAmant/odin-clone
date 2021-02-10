import './LessonCard.css';
import React, { useState, useEffect } from 'react';
import usePrevious from '../usePrevious';

const LessonCard = (props) => {
  const [loadLessons, setLoadLessons] = useState(true);
  const [loadAuthlessLessons, setLoadAuthlessLessons] = useState([]);

  const prevUserId = usePrevious(props.userId);

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
    } else {
    }
  };

  buttonUpdater();

  useEffect(() => {
    if (prevUserId !== props.userId || props.reload === true) {
      setLoadLessons(true);
    }
  }, [prevUserId, props.userId, props.reload]);

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
