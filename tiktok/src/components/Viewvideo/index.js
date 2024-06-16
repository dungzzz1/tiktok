import classNames from 'classnames/bind';
import { FacebookShareButton } from 'react-share';
import styles from './Viewvideo.module.scss';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMusic,faComment } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import { CommentIcon, FavouriteIcon, FavouritesIcon, HeartIcon, HeartResIcon, ShaseIcon } from '~/accset/icon';
import Commenuser from './Commet';
import axios from 'axios';
const cx = classNames.bind(styles);
function Viewvideo({ video,handle,user,handleShare,handleSub,isFollowing,isLiked,handleLike,likeCount,isFavourite,FavouriteCount,handleFavourite}) {
    const videoRef = useRef(null);
    const [videoWidth, setVideoWidth] = useState(null);
    useEffect(() => {
        if (videoRef.current) {
            setVideoWidth(videoRef.current.offsetWidth);
        }
    }, []);
    function handleVideoEnded(event) {
        event.target.currentTime = 0;
        event.target.play();
    }
    const handleResize = () => {
        if (videoRef.current) {
            setVideoWidth(videoRef.current.offsetWidth);
        }
    };
    //add comnet 
    const [newComment, setNewComment] = useState('');
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };
    const handleCommentSubmit = async () => {
        try {
          const response = await axios.post('/commnets/', {
            desc: newComment,
            userId: user._id,
            videoId: video._id,
          });
          const savedComment = response.data;
          // Xử lý logic hiển thị bình luận đã đăng thành công (nếu cần)
          console.log('Bình luận đã được đăng:', savedComment);
          setNewComment(''); // Xóa nội dung bình luận trong ô input sau khi đăng thành côn
        } catch (error) {
          // Xử lý logic khi xảy ra lỗi (nếu cần)
          console.error('Lỗi khi đăng bình luận:', error);
        }
      };
      const inputRef = useRef(null);
      const handleCopyButtonClick = () => {
        if (inputRef.current) {
          inputRef.current.select(); // Chọn toàn bộ nội dung trong ô input
          document.execCommand('copy'); // Sao chép nội dung vào clipboard
        }
      };
      const isVideo = video.videoUrl
      const [videoUrl, setVideoUrl] = useState(isVideo);
      const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
      };
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div ref={videoRef} onResize={handleResize} className={cx('main')}>
                    <FontAwesomeIcon className={cx('icon-close')} icon={faClose} onClick={handle} />
                    <video
                        muted
                        autoPlay
                        onEnded={handleVideoEnded}
                        ref={videoRef}
                        controls
                        style={{ width: videoWidth }}
                        src={video.videoUrl}
                    />
                </div>
                <div className={cx('main-right')}>
                    <div className={cx('main-right-top')}>
                       <div  className={cx('ba')} >
                        <div className={cx('table')}>
                                <div className={cx('table-top')}>
                                    <img
                                        src={user.img}
                                        alt="hihi"
                                    />
                                    <div>
                                        <h3>{user.name}</h3>
                                        <span>{user.nameid}</span>
                                    </div>
                                </div>
                                <Button onClick={handleSub} outline>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                            </div>
                            <div className={cx('table-text')}>
                            <div style={{display:"flex"}} >
                                    <p>{video.title}</p>
                                    <b><span style={{color:'blue'}} >{video.tags}</span></b>
                                </div>
                                <div className={cx('table-link')}>
                                    <FontAwesomeIcon icon={faMusic} />
                                    <h4> - nhạc nền - {video.link}</h4>
                                </div>
                            </div>
                       </div>
                        <div className={cx('table-btn')}>
                            <div onClick={handleLike} className={cx('k')}>
                                <div className={cx('h')}>
                                { isLiked  ? <HeartResIcon /> : <HeartIcon />}
                                </div>
                                <span>{likeCount}</span>
                            </div>
                            <div className={cx('k')}>
                                <div className={cx('h')}>
                                    <CommentIcon />
                                </div>
                                <span>2</span>
                            </div>
                            <div className={cx('k')}>
                              <button onClick={handleFavourite}  style={{background:'none'}} >
                                <div className={cx('h')}>
                                       {isFavourite ?  
                                        <FavouritesIcon /> : 
                                       <FavouriteIcon />}
                                </div>
                              </button>
                            <span>{FavouriteCount}</span>
                            </div>
                            <div className={cx('k')}>
                                <div className={cx('h')}>
                                <FacebookShareButton url={video.videoUrl} onClick={handleShare}> 
                                 <ShaseIcon />
                                </FacebookShareButton> 
                                </div>
                                <span>1</span>
                            </div>
                        </div>
                        <div className={cx('table-btn-link')}>
                            <input ref={inputRef} value={videoUrl} onChange={handleVideoUrlChange} />
                            <button onClick={handleCopyButtonClick} >
                                <b>sao chép link</b>
                            </button>
                        </div>
                    </div>
                    <div className={cx('main-right-bottom')}>
                        <div className={cx('comment')}>
                            <Commenuser newComment={newComment} video={video} />
                        </div>
                    </div>
                    <div className={cx('main-input-commet')}  >
                        <input
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Nhập bình luận của bạn"
                         />
                        <Button  onClick={handleCommentSubmit} outline >Đăng</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Viewvideo;
