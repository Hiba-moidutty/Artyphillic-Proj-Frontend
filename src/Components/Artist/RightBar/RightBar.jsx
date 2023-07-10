
import Events from "../Events/Events";
import "./RightBar.css";



const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <div className="event-heading">
            <h2 style={{ color: '#611D42', fontWeight: 'bold'}}>Hurry Up!!!!!</h2>
            <h6 style={{ color: '#BC244A', fontWeight: 'bold'}}>Book your slots for the Events....</h6>
          </div>
          <Events/>
        </div>
      </div>
    </div>
  );
};

export default RightBar;