import './LessonCard.css';

const LessonCard = (props) => {
  const lessons = props.lesson.map((item) => {
    return <div>{item}</div>;
  });

  return (
    <div className="lessonCard">
      <div className="lessonTop">
        <div>
          <div className="lessonName">{props.name}</div>
          <div>{props.description}</div>
        </div>
      </div>
      <div className="listLesson">
        <div>{lessons}</div>
      </div>
    </div>
  );
};

export default LessonCard;
