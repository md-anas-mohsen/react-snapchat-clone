import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, selectUser, storePosts } from '../../features/appSlice';
import { auth, db } from '../../firebase';
import Chat from '../Chat/Chat';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetImage } from '../../features/cameraSlice';

import './styles/Chats.css';

const Chats = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const postsStore = useSelector(selectPosts);
    const user = useSelector(selectUser);
    
    const [posts, setPosts] = useState([]);

    const snap = () => {
        dispatch(resetImage());
        history.push('/');
    }

    useEffect(() => {
        db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))));
        if (posts.length !== postsStore?.length) {
            dispatch(storePosts(posts));
        }
    }, [dispatch, posts, postsStore]);

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar className="chats__avatar" src={user.profilePic} onClick={() => auth.signOut()} />
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon" />
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon className="chats__chatIcon" />
            </div>
            <div className="chats__posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>
            <RadioButtonUncheckedIcon onClick={snap} className="chats__takePic" fontSize="large" />
        </div>
    )
}

export default Chats;
