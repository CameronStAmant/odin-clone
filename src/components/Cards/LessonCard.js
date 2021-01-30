import './LessonCard.css';
import { db } from '../../services/firebase';

const LessonCard = (props) => {
  let foundationsData;
  let foundationsStatus = [];
  const pullDatabase = () => {
    foundationsStatus = [];
    foundationsData = db.ref().child('Foundations');
    foundationsData.on('value', (snapshot) => {
      snapshot.forEach(function (child) {
        foundationsStatus.push(child.val());
      });
    });

    console.log(foundationsStatus);
  };

  pullDatabase();

  const updateDatabase = (lesson) => {
    if (lesson !== undefined) {
      const specificLesson = {};
      console.log(foundationsStatus[0][lesson]);
      if (foundationsStatus[0][lesson] === false) {
        specificLesson[lesson] = true;
      } else {
        specificLesson[lesson] = false;
      }
      foundationsData.child('Introduction').update(specificLesson);
      pullDatabase();
    }
  };

  updateDatabase();

  const lessons = props.lesson.map((item) => {
    // let choice;
    // console.log(foundationsStatus[0][item])
    // if (foundationsStatus[0][item] === false) {
    //   choice = <button onClick={() => updateDatabase(item)}>Mark</button>;
    // } else {
    //   choice = <button onClick={() => updateDatabase(item)}>Unmark</button>;
    // }

    return (
      <div key={item} className="lesson">
        <li>{item}</li>
        <button onClick={() => updateDatabase(item)}>Mark</button>
      </div>
    );
  });

  return (
    <div className="lessonCard">
      <div className="lessonTop">
        <div>
          <div className="lessonName">{props.name}</div>
          <div>{props.description}</div>
        </div>
      </div>
      <div className="listLesson">{lessons}</div>
    </div>
  );
};

export default LessonCard;
