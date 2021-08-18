import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setImage } from '../../features/cameraSlice';
import { useHistory } from 'react-router-dom';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import './styles/Camera.css';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: 'user'
}

const Camera = () => {
    const dispatch = useDispatch();
    const cameraRef = useRef(null);
    const history = useHistory();

    const capture = useCallback(() => {
        const imageSrc = cameraRef.current.getScreenshot();
        dispatch(setImage(imageSrc));
        history.push("/preview");
    }, [cameraRef, dispatch, history]);
    
    return (
        <div className="camera">
            <Webcam
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
                ref={cameraRef}
            />
            <ChatBubbleIcon 
                onClick={() => history.push('/chats')}
                className="camera__toChats"
                fontSize="small" 
            />
            <RadioButtonUncheckedIcon 
                onClick={capture} 
                className="camera__capture" 
                fontSize="large"
            />
        </div>
    )
}

export default Camera
