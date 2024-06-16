import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Seachvideo.module.scss';
import ha from './ha.mp4'
import ViewvideoSeach from './Viewvideo';
import axios from 'axios';
const cx = classNames.bind(styles);
function VideoSeach({video}) {
    const [opentab, setopentab] = useState(false);
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);
    const handle = () => {
        setopentab(false);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };
    const handleVideo = () => {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play();
        setPlaying(true);
      }
    };   
    const handleview = () => {
        setopentab(true);
        videoRef.current.pause();
    };
    const [user ,setuser] = useState([])
    useEffect(()=>{
        const fetchVideos = async ()=>{
            const res = await axios.get(`/users/find/${video.userId}`)
            setuser(res.data)
        }
        fetchVideos()
    },[video.userId])
    return ( 
        <div className={cx('Seach')}>
            <div className={cx('Seach-video')} >
                <div className={cx('header-video')} >
                        <video
                        muted
                        ref={videoRef}
                        onClick={handleview}
                        src={video.videoUrl}
                        loop
                    />
                </div>
                <div>
                    <div className={cx('bottom')} >  
                        <span>{video.title}</span>
                        <span className={cx('text')} >{video.tags}</span>
                    </div>
                    <div  className={cx('item')} >
                        <div className={cx('imge')} >
                            <img src={user.img} />
                            <span>{user.name}</span>
                        </div>
                        <div  className={cx('head')} >
                            <span>190.0 K</span>
                        </div>
                    </div>
                </div>
            </div>
            {opentab && <ViewvideoSeach user={user} video={video} handle={handle} setopentab={setopentab} />}
        </div>
    );
}

export default VideoSeach;