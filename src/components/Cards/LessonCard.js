import './LessonCard.css';
import { db } from '../../services/firebase';
import React, { useState } from 'react';

const LessonCard = (props) => {
  const [loadLessons, setLoadLessons] = useState(true);
  let foundationsData;
  let foundationsStatus = [];
  let lessons;

  const updateDatabase = (lesson) => {
    const specificLesson = {};
    if (foundationsStatus[0][lesson] === false) {
      specificLesson[lesson] = true;
      props.changePercentage('+');
    } else {
      specificLesson[lesson] = false;
      props.changePercentage('-');
    }
    foundationsData.child('Introduction').update(specificLesson);
    pullDatabase();
  };

  const buttonUpdater = () => {
    lessons = props.lesson.map((item) => {
      let choice;
      if (foundationsStatus[0].length !== 0) {
        if (foundationsStatus[0][item] === false) {
          choice = <button onClick={() => updateDatabase(item)}>Mark</button>;
        } else {
          choice = <button onClick={() => updateDatabase(item)}>Unmark</button>;
        }
      }

      return (
        <div key={item} className="lesson">
          <li>{item}</li>
          {choice}
        </div>
      );
    });
    if (loadLessons === true) {
      setLoadLessons(lessons);
    }
  };

  const pullDatabase = async () => {
    foundationsStatus = [];
    foundationsData = db.ref().child('Foundations');
    await foundationsData.once('value', async (snapshot) => {
      snapshot.forEach(function (child) {
        foundationsStatus.push(child.val());
      });
    });
    buttonUpdater();
  };

  pullDatabase();

  return (
    <div className="lessonCard">
      <div className="lessonTop">
        <div>
          <div className="lessonName">{props.name}</div>
          <div>{props.description}</div>
        </div>
      </div>
      <div className="listLesson">{loadLessons}</div>
    </div>
  );
};

export default LessonCard;
