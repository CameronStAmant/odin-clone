import Header from './HeaderFooter/Header';
import PathCard from './Cards/PathCard';

const Foundations = () => {
  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations path below</div>
        <PathCard
          name="Foundations"
          path="/courses/foundations"
          tag="course"
          description="This is the start of a lot of learning. This path is going to include all of the essentials you will need in order to get your developer career where you want it to be."
        />
      </div>
    </div>
  );
};

export default Foundations;
