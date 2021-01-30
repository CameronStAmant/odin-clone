import Header from './HeaderFooter/Header';
import LessonCard from './Cards/LessonCard';

const FoundationsCourse = () => {
  const lessons = [
    'Get a computer',
    'Hop on Discord and introduce yourself',
    'Mark off lessons as you complete them',
    'Keep working',
    'And working',
  ];

  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations course!</div>
        <ol>
          <LessonCard
            name="Introduction"
            description="This is the start of the rest of your career!"
            lesson={lessons}
          />
        </ol>
      </div>
    </div>
  );
};

export default FoundationsCourse;
