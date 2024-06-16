import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Isitem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPause, faPlay, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const cx = classNames.bind(styles);

function IsItem() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos ,setvideo] = useState([])
  useEffect(()=>{
    const fetchVideos = async ()=>{
        const res = await axios.get("/lives/random")
        setvideo(res.data)
    }
    fetchVideos()
},[])
  const handleSlide = (direction) => {
    setCurrentIndex((prevIndex) => {
      let newIndex;
      if (direction === 'up') {
        newIndex = prevIndex === 0 ? videos.length - 1 : prevIndex - 1;
      } else if (direction === 'down') {
        newIndex = prevIndex === videos.length - 1 ? 0 : prevIndex + 1;
      }
      return newIndex;
    });
  };
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
      setPlaying(true);
      videoRef.current.play();
  };
  const handlePause = () => {
      setPlaying(false);
      videoRef.current.pause();
  };
  return (
    <div className={cx('video-slider')}>
      <div className={cx('video-container')}>
        <video src={videos[currentIndex]?.videoUrl}  ref={videoRef} autoPlay />
        <div className={cx('btn')} >
        <button className={cx('slide-button', 'down')} onClick={() => handleSlide('down')}>
          <FontAwesomeIcon  icon={faChevronUp} />
          </button>
          <button className={cx('slide-button', 'up')} onClick={() => handleSlide('up')}>
          <FontAwesomeIcon  icon={faChevronDown} />
          </button>
        </div>
        <div className={cx('user')} >
          <h5>LIVE</h5>
          <div className={cx('user-text')} >
            <span>{videos[currentIndex]?.user}</span>
            <FontAwesomeIcon className={cx('user-icon')} icon={faUser} />
            <span>{videos[currentIndex]?.views}</span>
          </div>
          <p>{videos[currentIndex]?.title}</p>
        </div>
        <div className={cx('over-live')} >
          <span>Nhấp Vào Để Xem LIVE</span>
        </div>
      </div>
    </div>
  );
}
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
export default IsItem;