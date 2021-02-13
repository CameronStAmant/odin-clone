import './Header.css';
import { Link } from 'react-router-dom';
import Auth from '../Cards/Auth';

const Header = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <div className="headerLeft"> The Odin Project </div>
        </Link>
        <Link to="/curriculum">
          <div> Curriculum </div>
        </Link>
        {/* </div> */}

        {/* <div className="headerRight"> */}
        <Auth />
      </div>
    </div>
  );
};

export default Header;
