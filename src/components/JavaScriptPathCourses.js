import Header from './HeaderFooter/Header';
import PathCard from './Cards/PathCard';

const Javascript = () => {
  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">JavaScript path below</div>
        <PathCard
          name="Foundations"
          path="/courses/foundations"
          tag="course"
          description="This is the start of a lot of learning. This path is going to include all of the essentials you will need in order to get your developer career where you want it to be."
        />
        <PathCard
          name="JavaScript"
          path="/courses/javascript"
          tag="course"
          description="Time to get to the good stuff!"
        />
      </div>
    </div>
  );
};

export default Javascript;
