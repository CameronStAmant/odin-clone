import Courses from './Courses';

const FoundationsCourse = () => {
  return (
    <div>
      <Courses
        name="Foundations"
        url="Foundations"
        lessonCount="2"
        lessonArrays={[[], []]}
        lessonName={['Introduction', 'Section 1']}
        lessonDescription={[
          'This is the start of the rest of your career!',
          "Let's get started",
        ]}
      />
    </div>
  );
};

export default FoundationsCourse;
