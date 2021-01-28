import Header from './HeaderFooter/Header';
import LessonCard from './Cards/LessonCard';

const FoundationsCourse = () => {
  const lessons = [
    '1. Get a computer',
    '2. Hop on Discord and introduce yourself',
    '3. Mark off lessons as you complete them',
    '4. Keep working',
  ];

  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations course!</div>
        <LessonCard
          name="Introduction"
          description="This is the start of the rest of your career!"
          lesson={lessons}
        />
      </div>
    </div>
  );
};

export default FoundationsCourse;
