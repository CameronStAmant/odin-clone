import './Header.css';
import { Link } from 'react-router-dom';
import Auth from '../Cards/Auth';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="headerLeft">The Odin Project</div>
      </Link>

      <div className="headerRight">
        <Link to="/curriculum">
          <div>Curriculum</div>
        </Link>
        <div>|</div>
        <div>Sign Up</div>
        <Auth />
      </div>
    </div>
  );
};

export default Header;
