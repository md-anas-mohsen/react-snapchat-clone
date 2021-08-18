import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loading, resetImage, selectCameraImage, sendImage } from '../../features/cameraSlice';
import CloseIcon from '@material-ui/icons/Close';
import TimerIcon from '@material-ui/icons/Timer';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import SendIcon from '@material-ui/icons/Send';
import { CircularProgress } from '@material-ui/core';
import { selectUser } from '../../features/appSlice';

import './styles/Preview.css';

const Preview = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const image = useSelector(selectCameraImage);
    const isLoading = useSelector(loading);
    const user = useSelector(selectUser);
    
    useEffect(() => {
        if (!image) {
            history.replace('/');
        } 
    }, [image, history]);
    
    const close = () => {
        dispatch(resetImage());
    }

    const send = () => {
        if (!isLoading) {
            dispatch(sendImage(user));
            dispatch(resetImage());
            history.replace('/');
        }
    }

    return (
        <div className="preview">
            <CloseIcon className="preview__close" onClick={close} />
            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img alt="" src={image}></img>
            <div onClick={send} className="preview__footer">
                {!isLoading ? 
                <>
                    <h2>Send Now</h2>
                    <SendIcon className="preview__sendIcon" />
                </>
                : <CircularProgress />}
            </div>
        </div>
    )
}

export default Preview;
