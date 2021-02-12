import Header from './HeaderFooter/Header';
import './Curriculum.css';
import PathCard from './Cards/PathCard';

const Curriculum = () => {
  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Learning Path</div>
        <PathCard
          name="Foundations"
          description="This is the start of a lot of learning. This path is going to include all of the essentials you will need in order to get your developer career where you want it to be."
          path="/curriculum/foundations"
          tag="path"
        />
        <PathCard
          name="JavaScript"
          description="Time to get to the good stuff!"
          path="/curriculum/javascript"
          tag="path"
        />
      </div>
    </div>
  );
};

export default Curriculum;
