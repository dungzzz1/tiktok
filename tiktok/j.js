import React, { useEffect, useRef, useState } from 'react';
import './VideoCard.css';
import classNames from 'classnames/bind';
import slytes from './MainVideo.module.scss';
import Button from '../Button';
import { useElementOnScreen } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Videwvideo from '../Viewvideo';
import BtnVideo from './Btnvideo';
import axios from 'axios';
const cx = classNames.bind(slytes);

const VideoList = ({ video }) => {
    //api video
    const videoRef = useRef(null);
    const [open, setopen] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    // chuyển đổi kích cơ video
    
    useEffect(() => {
        const videoItems = document.querySelectorAll('.video-item video');
        videoItems.forEach((video) => {
            video.addEventListener('loadedmetadata', function () {
                if (this.videoWidth > this.videoHeight) {
                    this.classList.add('landscape');
                } else {
                    this.classList.add('portrait');
                }
            });
        });
    }, []);
    const handlePlay = () => {
        setPlaying(true);
        videoRef.current.play();
    };

    const handlePause = () => {
        setPlaying(false);
        videoRef.current.pause();
    };
    
    const handlevideo = () => {
        // setIsFullScreen(!isFullScreen);
        // if (playing) {
        //     videoRef.current.pause();
        //     setPlaying(false);
        // } else {
        //     videoRef.current.play();
        //     setPlaying(true);
        // }
    };
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };
    const isVisibile = useElementOnScreen(options, videoRef);
    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);
    //thanh điều chinh time video
    // const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    }, [videoRef]);
    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleDurationChange = () => {
        setDuration(videoRef.current.duration);
    };

    const handleTimeSeek = (event) => {
        const newTime = event.target.value;
        setCurrentTime(newTime);
        videoRef.current.currentTime = newTime;
    };
    //điều chỉnh âm thanh cho video
    // const [volume, setVolume] = useState(1);
    // const handleVolumeChange = (event) => {
    //     const video = videoRef.current;
    //     const newVolume = parseFloat(event.target.value);

    //     video.volume = newVolume;
    //     setVolume(newVolume);
    // };
    // phát lại video khu lướt qua video
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScroll = () => {
        if (videoRef.current) {
            const videoTop = videoRef.current.getBoundingClientRect().top;
            const videoBottom = videoRef.current.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (videoTop < windowHeight && videoBottom >= 0) {
                if (videoRef.current.paused) {
                    videoRef.current.play();
                }
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0; // Đặt lại thời gian của video về 0 khi video kết thúc
            }
        }
    };
    //view video
    const handleview = () => {
        setopen(true);
        videoRef.current.pause();
    };
    const handle = () => {
        setopen(false);
        videoRef.current.play();
        videoRef.current.currentTime = 0;
    };
    // const { currentUser } = useSelector((state) => state.user);
    const [user ,setuser] = useState([])
    useEffect(()=>{
        const fetchVideos = async ()=>{
            const res = await axios.get(`/users/find/${video.userId}`)
            setuser(res.data)
        }
        fetchVideos()
    },[video.userId])
    return (
        <div className={cx('head')}>
            <img
                src={user.img}
                alt="hihi"
            />
            <div className={cx('head-video')}>
                <div className={cx('head-table')}>
                    <h3>{user.name}</h3>
                    <span>LOve</span>
                </div>
                <div className={cx('head-table')}>
                    <p>{video.title}</p>
                    <span>{video.tags}</span>
                </div>
                <div className={cx('head-table')}>
                <FontAwesomeIcon icon={faMusic} />
                <h3>- nhạc nền - 陈草 - _陈草✨</h3>
                </div>
                <div className={cx('head-list-video')}>
                    <div className="video-list">
                        <div className={cx('bt')}>
                            <div className="video-item " onClick={handlevideo} >
                                <video
                                    type="video/mp4"
                                    loop
                                    src={video.videoUrl}
                                    ref={videoRef}
                                    onClick={handleview}
                                    onTimeUpdate={handleTimeUpdate}
                                    onDurationChange={handleDurationChange}
                                    onEnded={() => {
                                        videoRef.current.currentTime = 0; // Đặt lại thời gian của video về 0 khi video kết thúc
                                        videoRef.current.play(); // Bắt đầu phát video lại từ đầu khi video kết thúc
                                    }}
                                ></video>
                            </div>
                            <div className="video-controls">
                                <button onClick={playing ? handlePause : handlePlay}>
                                    {' '}
                                    {playing ? (
                                        <FontAwesomeIcon
                                            className={cx('btn-play')}
                                            icon={faPause}
                                            // onVideoClick={handlevideo}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className={cx('btn-play')}
                                            icon={faPlay}
                                            // onVideoClick={handlevideo}
                                        />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || "" }
                                    value={currentTime}
                                    onChange={handleTimeSeek}
                                />
                                <span>
                                    {formatTime(currentTime)}/{formatTime(duration)}
                                </span>
                                {/* <div className="volume-control">
                                    <div className="volume-icon">
                                        {volume > 0.5 ? (
                                            <FontAwesomeIcon icon={faVolumeUp} />
                                        ) : volume > 0 ? (
                                            <FontAwesomeIcon icon={faVolumeDown} />
                                        ) : (
                                            <FontAwesomeIcon icon={faVolumeMute} />
                                        )}
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="volume-slider"
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-video')}>
                        <BtnVideo handleview={handleview} video={video} />
                    </div>
                </div>
            </div>
            <div className={cx('btn-flow')}>
                <Button outline smaill>
                    Follow
                </Button>
            </div>
            {open && <Videwvideo handle={handle} video={video} setopen={setopen} />}
        </div>
    );
};
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
export default VideoList;
.video-controls {
    position: absolute;
    align-items: center;
    justify-content: center;
    display: flex;
    bottom: 10px;
    width: 100%;
    height: 20px;
}
input[type="range"]::-webkit-slider-thumb {
    opacity: 0;
}
input[type="range"]:hover::-webkit-slider-thumb {
    opacity: 1;
}
/* Play/Pause button */
.video-controls button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}

.video-controls svg {
    width: 40px;
    height: 40px;
    fill: white;
}

/* Time display */
.video-controls span {
    font-size: 14px;
    color: white;
}

/* Range input */
.video-controls input[type='range'] {
    width: 70%;
    height: 2px;
    background-color: white;
    border: none;
    border-radius: 2px;
    outline: none;
}

/* .video-controls input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
} */
/* .video-controls input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #d41a1a;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
} */

/* .video-controls input[type='range']::-webkit-slider-runnable-track {
    height: 2px;
    background-color: #ddd;
    border-radius: 2px;
} */

.volume-control {
   position: absolute;
   transform: translateY(-50%);
   bottom: -80%;
   left: 84%;
}

.volume-icon {
    color: #fff;
    font-size: 24px;
}
.volume-slider {
    width: 4px;
    height: 80px;
    background-color: #999;
    border-radius: 10px;
    -webkit-appearance: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: rotate(-90deg); /* xoay thanh trượt điều khiển âm lượng */
}
  
.volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #999;
  cursor: pointer;
  transform: rotate(90deg);
}
  
.volume-icon {
    margin-right: 10px;
    font-size: 20px;
    color: #fff;
}
  

.volume-slider:focus {
    outline: none;
}
  
.volume-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid #999;
    cursor: pointer;
}

.video-card {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 75%;
}

.video-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}

.video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    transition: all 0.3s ease-in-out;
}

.overlay.zoomed {
    height: 100%;
    flex-direction: column;
    justify-content: center;
}

.heart-button,
.comment-button,
.zoom-button {
    color: white;
    font-size: 24px;
    margin-right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
}

.comment-button {
    position: relative;
}

.comment-button .fa-comment {
    position: absolute;
    top: 4px;
    left: -18px;
}

.comment-button .fa-comment-dots {
    position: absolute;
    top: 4px;
    left: -20px;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

.comment-form {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
}

.comment-form.open {
    width: 200px;
}

.comment-input {
    flex: 1;
    height: 30px;
    margin-right: 10px;
    padding: 0 10px;
    border: none;
    outline: none;
}

.comment-submit-button {
    color: white;
    font-size: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
}
