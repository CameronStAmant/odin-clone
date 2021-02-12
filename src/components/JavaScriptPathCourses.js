import Header from './HeaderFooter/Header';
import PathCard from './Cards/PathCard';

const Javascript = () => {
  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">JavaScript path below</div>
        <PathCard name="JavaScript" path="/courses/javascript" tag="course" />
        <button>Go to JavaScript Course</button>
      </div>
    </div>
  );
};

export default Javascript;
