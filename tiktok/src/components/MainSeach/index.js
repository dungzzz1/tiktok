import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Seach.module.scss';
import VideoSeach from './VideoSeach';
import UserSeach from './UserSeach';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(styles)
function MainSeach() {
    const [activeTab, setActiveTab] = useState('tab1');
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;
    useEffect(() => {
      const fetchVideos = async () => {
        const res = await axios.get(`/videos/search${query}`);
        setVideos(res.data);
      };
      fetchVideos();
    }, [query]);
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    return ( 
        <div>
            <div className={cx('tap-menu')} >
                <div>
                    <button
                    className={cx('btn', { active: activeTab === 'tab1' })}
                    onClick={() => handleTabClick('tab1')}
                    >
                    Tất Cả
                    </button>
                    <button
                    className={cx('btn', { active: activeTab === 'tab2' })}
                    onClick={() => handleTabClick('tab2')}
                    >
                    Tài Khoản
                    </button>
                    <button
                    className={cx('btn', { active: activeTab === 'tab3' })}
                    onClick={() => handleTabClick('tab3')}
                    >
                    Video
                    </button>
                </div>
            </div>
                <div>
                    {activeTab === 'tab1' &&
                        <div>
                            <div>
                            <div className={cx('acount-text')} >
                                <h3>Tài Khoản</h3>
                                <span>Xem Thêm</span>
                            </div>
                                <UserSeach />
                            </div>
                            <div className={cx('tb')} >
                                <h3 >Video</h3>
                               <div className={cx('zung')} >
                               {videos.map(video=>(
                                    <VideoSeach key={video._id} video={video}/>
                                ))}
                               </div>
                            </div>
                        </div>
                    }
                    {activeTab === 'tab2' && <div><UserSeach /></div>}
                    {activeTab === 'tab3' && <div className={cx('zung')} >
                    {videos.map(video=>(
                        <VideoSeach key={video._id} video={video}/>
                    ))}</div>}
            </div>  
        </div>
     );
}

export default MainSeach;