import React, { useEffect, useRef, useState } from 'react';
import './VideoCard.css';
import classNames from 'classnames/bind';
import axios from 'axios';
import slytes from './MainVideo.module.scss';
import Button from '../Button';
import { useElementOnScreen } from './index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import Videwvideo from '../Viewvideo';
import BtnVideo from './Btnvideo';
import {produce} from "immer";

import fetchSuccess, {  disfavourite, dislike, favourite, like } from "~/redux/VideoSlice"
import {  useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, subscription } from "~/redux/UserSlice";
import Login from '~/pages/Login';
const cx = classNames.bind(slytes);

const VideoList = ({ video }) => {
    //api video
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
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const dispatch = useDispatch();
    // console.log(currentVideo)
    // function handleVideoClick() {
    //     setIsFullScreen(!isFullScreen);
    // }
    // const handlevideo = () => {
    //     setIsFullScreen(!isFullScreen);
    //     if (playing) {
    //         videoRef.current.pause();
    //         setPlaying(false);
    //     } else {
    //         videoRef.current.play();
    //         setPlaying(true);
    //     }
    // };
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
            videoRef.current.currentTime = 0;
            setPlaying(true);
          }
        } else {
          if (playing) {
            videoRef.current.pause();
            setPlaying(false);
          }
        }
      }, [isVisibile]);
    const handlePlay = () => {
        setPlaying(true);
        videoRef.current.play();
    };
    const handlePause = () => {
        setPlaying(false);
        videoRef.current.pause();
    };
   // thanh điều chinh time video
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
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
    const [volume, setVolume] = useState(1);
    const handleVolumeChange = (event) => {
        const video = videoRef.current;
        const newVolume = parseFloat(event.target.value);

        video.volume = newVolume;
        setVolume(newVolume);
    };
    // phát lại video khu lướt qua video

    //view video
    const handleview = () => {
        setopentab(true);
        videoRef.current.pause();
    };
    const handle = () => {
        setopentab(false);
        videoRef.current.play();
        videoRef.current.currentTime = 0;
    };
    const [user ,setuser] = useState([])
    useEffect(()=>{
        const fetchVideos = async ()=>{
            const res = await axios.get(`/users/find/${video.userId}`)
            setuser(res.data)
        }
        fetchVideos()
    },[video.userId])
//nút fl
    const [channel, setChannel] = useState();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const videoRes = await axios.get(`/videos/find/${video._id}`);
          const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
          setChannel(channelRes.data);
          dispatch(fetchSuccess(videoRes.data));
        } catch (err) {
          // Xử lý lỗi ở đây nếu cần thiết
        }
      };
      fetchData();
    }, [dispatch,video._id]);
    //ẩn nút following
    const { currentUser } = useSelector((state) => state.user);
    const [opentab, setopentab] = useState(false);
    const [open, setopen] = useState(false);
    const isFollowing = useSelector((state) =>
        state.user.currentUser?.subscribedUsers?.includes(user._id)
    );
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const handleSub = async () => {
        try {
        if (!isLoggedIn) {
            setopen(true)
        }
          if (isFollowing) {
            await axios.put(`/users/unsub/${channel._id}`);
            dispatch(subscription(channel._id));
          } else {
            await axios.put(`/users/sub/${channel._id}`);
            dispatch(subscription(channel._id));
          }
        } catch (error) {
          // Xử lý lỗi
        }
      };

     //nút like
    const isUploader = video.likes.includes(currentUser?._id);
    const [likeCount, setLikeCount] = useState(video.likes.length);
    const [isLiked, setIsLiked] = useState(isUploader);
    const handleLike = async () => {
      if (!isLoggedIn) {
        setopen(true);
        return;
      }
      const apiUrl = isLiked ? `/users/dislike/${video._id}` : `/users/like/${video._id}`;
      try {
        setIsLiked((prevLiked) => !prevLiked);
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
        await axios.put(apiUrl);
        if (isLiked) {
          dispatch(dislike({ videoId: video._id }));
        } else {
          dispatch(like({ videoId: video._id }));
        }
      } catch (error) {
        setIsLiked((prevLiked) => !prevLiked); 
      }
    };
    // favourite
    const isFavourites = video.favourite.includes(currentUser?._id);
    const [FavouriteCount, setFavouriteCount] = useState(video.favourite.length);
    const [isFavourite, setFavourite] = useState(isFavourites);
    const handleFavourite = async () => {
      if (!isLoggedIn) {
        setopen(true);
        return;
      }
      const apiUrl = isFavourite ? `/users/disfavourite/${video._id}` : `/users/favourite/${video._id}`;
      try {
        setFavourite((prevLiked) => !prevLiked);
        setFavouriteCount((prevCount) => (isFavourite ? prevCount - 1 : prevCount + 1));
        await axios.put(apiUrl);
        if (isFavourite) {
          dispatch(favourite({ videoId: video._id }));
        } else {
          dispatch(disfavourite({ videoId: video._id }));
        }
      } catch (error) {
        setFavourite((prevLiked) => !prevLiked); 
      }
    };
    // chia sẻ
     const [sharedVideo, setSharedVideo] = useState('');
     const [error, setError] = useState('');
     const handleShare = async () => {
         try {
           const response = await axios.get(`/videos/share/${video._id}`);
           setSharedVideo(response.data);
           setError('');
         } catch (error) {
           setError('Video not found');
           setSharedVideo(video._id);
         }
       };
    const isđisFollowing =currentUser && currentUser._id === video.userId;
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
                    <b><span style={{color:'blue'}} >{video.tags}</span></b>
                </div>
                <div className={cx('head-table')}>
                <FontAwesomeIcon icon={faMusic} />
                <h3> - nhạc nền - {video.link}</h3>
                {error && <p>{error}</p>}
                {sharedVideo && (
                    <div>
                    <p>Title: {sharedVideo.title}</p>
                    {/* Hiển thị các thông tin khác của video */}
                    </div>
                )}
                </div>
                <div className={cx('head-list-video')}>
                    <div className="video-list">
                        <div className={cx('bt')}>
                            <div className="video-item ">
                                <video
                                    type="video/mp4"
                                    preload="true"
                                    // muted
                                    loop
                                    src={video.videoUrl}
                                    ref={videoRef}
                                    onClick={handleview}
                                    onTimeUpdate={handleTimeUpdate}
                                    onDurationChange={handleDurationChange}
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
                                {/* <input
                                    type="range"
                                    min="0"
                                    max={duration}
                                    value={currentTime}
                                    onChange={handleTimeSeek}
                                />
                                <span>
                                    {formatTime(currentTime)}/{formatTime(duration)}
                                </span> */}
                                {/* <div className="volume-control">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="volume-slider"
                                    />
                                    <div className="volume-icon">
                                        {volume > 0.5 ? (
                                            <FontAwesomeIcon icon={faVolumeUp} />
                                        ) : volume > 0 ? (
                                            <FontAwesomeIcon icon={faVolumeDown} />
                                        ) : (
                                            <FontAwesomeIcon icon={faVolumeMute} />
                                        )}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-video')}>
                        <BtnVideo isFavourite={isFavourite} FavouriteCount={FavouriteCount} handleFavourite={handleFavourite} sharedVideo={sharedVideo} likeCount={likeCount} isLoggedIn={isLoggedIn} handleShare={handleShare} handleLike={handleLike} isLiked={isLiked} channel={channel} user={user} handleview={handleview} video={video} />
                    </div>
                </div>
            </div>
            <div style={{ display: isđisFollowing ? 'none' : 'block' }} // Ẩn/hiển thị nút dựa trên kết quả kiểm tra
                 className={cx('btn-flow')}>
                <Button onClick={handleSub} outline smaill>
                    {isFollowing ? 'Following' : 'Follow'}
                </Button>
            </div>
            {open && <Login setopen={setopen} />}
            {opentab && <Videwvideo isFavourite={isFavourite} FavouriteCount={FavouriteCount} handleFavourite={handleFavourite} likeCount={likeCount} handleLike={handleLike} isLiked={isLiked} isFollowing={isFollowing} handleSub={handleSub} handleShare={handleShare} handle={handle} user={user} video={video} setopentab={setopentab} />}
        </div>
    );
};
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default (VideoList);
