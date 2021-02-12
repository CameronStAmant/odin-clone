import Header from './HeaderFooter/Header';
import PathCard from './Cards/PathCard';

const Foundations = () => {
  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations path below</div>
        <PathCard name="Foundations" path="/courses/foundations" tag="course" />
        <button>Go to Foundations Course</button>
      </div>
    </div>
  );
};

export default Foundations;
