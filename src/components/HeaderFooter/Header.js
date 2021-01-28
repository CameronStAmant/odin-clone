import './Header.css';
import { Link } from 'react-router-dom';

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
        <div>Log In</div>
      </div>
    </div>
  );
};

export default Header;
