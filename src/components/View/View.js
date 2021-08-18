import React, { useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectSelectedImage } from '../../features/appSlice';

import './styles/View.css';

const View = () => {
    const image = useSelector(selectSelectedImage);
    
    const history  = useHistory();

    useEffect(() => {
        if (!image) {
            close();
        }
    }, [image]);

    const close = () => {
        history.replace('/chats');
    }

    return (
        <div className="view">
            <img
                className="view__image"
                src={image}
                alt=""
                onClick={close}
            />
            <div className="view__timer">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ["#004777", 0.33],
                        ["#F7B801", 0.33],
                        ["#A30000", 0.33]
                    ]}
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            close();
                        }
                        return remainingTime;
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default View;
