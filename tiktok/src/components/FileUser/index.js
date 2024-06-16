
import Button from '../Button';
import classNames from 'classnames/bind';
import slytes from './FileUser.module.scss';
import { createRef, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import EditUser from '../EditUser';
const cx = classNames.bind(slytes);
function useMenuTabs() {
    const [activeTab, setActiveTab] = useState('tab1');
    const contentRef = useRef(null);
const handleTabClick = (tab) => {
  setActiveTab(tab);
  if (contentRef.current) {
    contentRef.current.scrollTo(0, 0);
  }
};  
    return [activeTab, handleTabClick, contentRef];
}  
function FileUser() {
    const [activeTab, handleTabClick, contentRef] = useMenuTabs();
    const { currentUser } = useSelector((state) => state.user);
    const [videos ,setvideo] = useState([])
    useEffect(() => {
        const fetchVideos = async () => {
          const res = await axios.get(`/videos/user/${currentUser._id}`);
          if (res.data) {
            setvideo(res.data);
            // Khởi tạo một videoRef cho mỗi video
            videoRefs.current = res.data.map(() => createRef());
          }
        };
        fetchVideos();
      }, [currentUser._id]);
      const [videolike ,setvideolike] = useState([])
      useEffect(() => {
          const fetchVideos = async () => {
            const res = await axios.get(`/videos/user/like/${currentUser._id}`);
            if (res.data) {
              setvideolike(res.data);
              // Khởi tạo một videoRef cho mỗi video
              videoRefs.current = res.data.map(() => createRef());
            }
          };
          fetchVideos();
        }, [currentUser._id]);
        const [videofavourite ,setvideofavourite] = useState([])
        useEffect(() => {
            const fetchVideos = async () => {
              const res = await axios.get(`/videos/user/favourite/${currentUser._id}`);
              if (res.data) {
                setvideofavourite(res.data);
                // Khởi tạo một videoRef cho mỗi video
                videoRefs.current = res.data.map(() => createRef());
              }
            };
            fetchVideos();
          }, [currentUser._id]);
    //điều khiên video
    const videoRefs = useRef([]);
    const handlePlayPause = (index) => {
        const videoRef = videoRefs.current[index];
        if (videoRef && videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      };
      const handleVideoClick = (index) => () => {
        handlePlayPause(index);
      };
    const [isopen, setisopen] = useState(false);
    return (
        <div className={cx('file')} >
            <div className={cx('file-header')} >
                <img src={currentUser.img}/>
                <div className={cx('file-header-text')} >
                    <h1>{currentUser.name}</h1>
                    <h3>{currentUser.nameid}</h3>
                    <Button text onClick={() => setisopen(true)}>
                        Sửa Hồ Sơ
                    </Button>
                </div>
            </div>
            <div className={cx('file-main')} >
             <>
                <span><b>12</b> Đang Follow</span>
                <span><b>4</b> Follower</span>
                <span><b>7288</b> Thích</span>
             </>
            </div>
            <div className={cx('file-ts')} >
                <p>{currentUser.nametd}</p>
            </div>
            <div className={cx('file-btn')} >
                <Button className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabClick('tab1')}>Video</Button>
                <Button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>Yêu Thích</Button>
                <Button className={activeTab === 'tab3' ? 'active' : ''} onClick={() => handleTabClick('tab3')}>Đã Thích</Button>
            </div>
            {activeTab === 'tab1' &&             
            <div className={cx('file-video')} >
                {videos.map((video,index) => (
                    <video 
                    ref={videoRefs.current[index]}
                    onClick={handleVideoClick(index)}
                    key={video._id} 
                    src={video.videoUrl}
                    />
                ))}
            </div>}
            {activeTab === 'tab2' && <div className={cx('file-video')} >
              {videofavourite.map((video,index) => (
                  <video 
                  ref={videoRefs.current[index]}
                  onClick={handleVideoClick(index)}
                  key={video._id} 
                  src={video.videoUrl}
                  />
              ))}
              </div>}
            {activeTab === 'tab3' && 
              <div className={cx('file-video')} >
              {videolike.map((video,index) => (
                  <video 
                  ref={videoRefs.current[index]}
                  onClick={handleVideoClick(index)}
                  key={video._id} 
                  src={video.videoUrl}
                  />
              ))}
              </div>}
            {isopen && <EditUser setisopen={setisopen} />}
        </div>
    );
}

export default FileUser;
