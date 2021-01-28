import './Home.css';
import Header from './HeaderFooter/Header';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="section">
        <div className="one">
          <div className="headerText">
            My Career in Web Development Started Here
          </div>
          <div className="text">
            This curriculum and community are a treasure trove of knowledge. It
            is all you need to prepare yourself for a career in web development.
          </div>
          <Link to="/curriculum">
            <button className="button">View The Curriculum</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
