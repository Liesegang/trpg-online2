import RoomWrapper from "./components/RoowWrapper";
import Transformable from "./components/Transformable";

const Room = () => {
  return (
    <div className="h-screen">
      <RoomWrapper>
        <Transformable>
          <p>Drag me around</p>
        </Transformable>
        <Transformable>
          <p>another</p>
        </Transformable>
      </RoomWrapper>
    </div>
  );
}

export default Room;
