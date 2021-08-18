import { Avatar } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import { selectImage } from '../../features/appSlice';
import { db } from '../../firebase';

import './styles/Chat.css';

const Chat = ({ id, username, timestamp, imageUrl, read, profilePic }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const openChat = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db
            .collection('posts')
            .doc(id)
            .set({ read: true }, { merge: true });
            history.push('/chats/view/');
        }
    }
    
    return (
        <div onClick={openChat} className="chat">
            <Avatar
                className="chat__avatar" 
                src={profilePic}
            />
            <div className="chat__info">
                <h4>{username}</h4>
                <p>
                    {!read ? 'Tap to view - ' : ' '}
                    <ReactTimeago date={new Date(timestamp).toUTCString()} />
                </p>
            </div>
            {!read && <StopRoundedIcon className="chat__readIcon" />}
        </div>
    )
}

export default Chat;
