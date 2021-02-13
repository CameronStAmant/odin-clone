import './PathCard.css';
import { Link } from 'react-router-dom';

const PathCard = (props) => {
  return (
    <div className="pathCard">
      <div className="pathTop">
        <div>
          <div className="pathName">{props.name}</div>
        </div>
        <Link to={props.path}>
          <button>View {props.tag}</button>
        </Link>
      </div>
      <div>{props.description}</div>
    </div>
  );
};

export default PathCard;
