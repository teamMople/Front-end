import React, { useEffect } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import PropTypes from 'prop-types';

const UserVideoComponent = ({ streamManager }) => {
  // console.log('π π streamManager', streamManager);
  // console.log('π π subscriber', subscriber);
  // const [stream, setStream] = useState(undefined);
  // const [name, setName] = useState(undefined);

  useEffect(() => {
    // if (streamManager) {
    //   streamManager.addVideoElement(videoRef.current);
    // } else {
    //   subscriber.addVideoElement(videoRef.current);
    // }
    // streamManager.addVideoElement(videoRef.current);
    // subscriber.addVideoElement(videoRef.current);
  }, []);

  // const getNicknameTag = () => {
  //   // Gets the nickName of the user
  //   if (streamManager) {
  //     return JSON.parse(streamManager.stream.connection.data).clientData;
  //   } else {
  //     return JSON.parse(subscriber.subscribers.stream.connection.data)
  //       .clientData;
  //   }
  // };

  // const videoRef = useRef();
  return (
    <div>
      {streamManager !== undefined && (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          {/*<OpenViduVideoComponent streamManager={sm} />*/}
          {/*<video*/}
          {/*  style={{ width: 200, height: 200 }}*/}
          {/*  autoPlay={true}*/}
          {/*  ref={videoRef}*/}
          {/*/>*/}
          <div>{/*<p>{getNicknameTag()}</p>*/}</div>
          {/*{streamManager.openvidu?.role === 'MODERATOR' && (*/}
          {/*  <button onClick={onClick}>λ°μΈκΆ μ£ΌκΈ°</button>*/}
          {/*)}*/}
        </div>
      )}
      {/*{subscriber && (*/}
      {/*  <div className="streamcomponent">*/}
      {/*    <div>subscriber</div>*/}
      {/*    <video*/}
      {/*      style={{ width: 200, height: 200 }}*/}
      {/*      autoPlay={true}*/}
      {/*      ref={videoRef}*/}
      {/*    />*/}
      {/*    <div>/!*<p>{getNicknameTag()}</p>*!/</div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

UserVideoComponent.propTypes = {
  streamManager: PropTypes.any,
  subscriber: PropTypes.any,
  onClick: PropTypes.any,
};

export default UserVideoComponent;
