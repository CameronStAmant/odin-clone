import Courses from './Courses';

const JavaScript = () => {
  return (
    <div>
      <Courses
        name="JavaScript"
        url="JavaScript"
        lessonCount="3"
        lessonArrays={[[], [], []]}
        lessonName={['Beginner', 'Intermediate', 'Advanced']}
        lessonDescription={[
          'Lets jump into JavaScript!',
          'Now for the fun stuff!',
          'Time for React!',
        ]}
      />
    </div>
  );
};

export default JavaScript;
