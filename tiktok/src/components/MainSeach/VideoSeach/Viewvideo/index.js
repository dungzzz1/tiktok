import classNames from 'classnames/bind';
import { FacebookShareButton } from 'react-share';
import styles from './Viewvideo.module.scss';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMusic,faComment } from '@fortawesome/free-solid-svg-icons';
import { CommentIcon, FavouriteIcon, HeartIcon, ShaseIcon } from '~/accset/icon';
import axios from 'axios';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function ViewvideoSeach({ video,handle,user,comments }) {
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
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div ref={videoRef} onResize={handleResize} className={cx('main')}>
                    <FontAwesomeIcon className={cx('icon-close')} icon={faClose} onClick={handle} />
                    <video
                        autoPlay
                        // onEnded={handleVideoEnded}
                        // ref={videoRef}
                        controls
                        style={{ width: videoWidth }}
                        src={video.videoUrl}
                    />
                </div>
                <div className={cx('main-right')}>
                    <div className={cx('main-right-top')}>
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
                            <Button outline>Follow</Button>
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
                        <div className={cx('table-btn')}>
                            <div className={cx('k')}>
                                <div className={cx('h')}>
                                    <HeartIcon />
                                </div>
                                <span>{video.likes?.length}</span>
                            </div>
                            <div className={cx('k')}>
                                <div className={cx('h')}>
                                    <CommentIcon />
                                </div>
                                <span>2</span>
                                {/* <span>{video.desc?.length}</span> */}
                            </div>
                            <div className={cx('k')}>
                                <div className={cx('h')}>
                                    <FavouriteIcon />
                                </div>
                                <span>{video.favourite?.length}</span>
                            </div>
                            <div className={cx('k')}>
                                <div className={cx('h')}>
                                {/* <FacebookShareButton url={video.videoUrl} onClick={handleShare}> 
                                </FacebookShareButton>  */}
                                <ShaseIcon />
                                </div>
                                <span>{video.shares?.length}</span>
                            </div>
                        </div>
                        <div className={cx('table-btn-link')}>
                            <input />
                            <button  >
                                <b>sao chép link</b>
                            </button>
                        </div>
                    </div>
                    <div className={cx('main-right-bottom')}>
                        <div className={cx('comment')}>
                            {/* <Commenuser newComment={newComment} video={video} /> */}
                        </div>
                    </div>
                    <div className={cx('main-input-commet')}  >
                        <input
                            // value={newComment}
                            // onChange={handleCommentChange}
                            placeholder="Nhập bình luận của bạn"
                         />
                        <Button
                            // onClick={handleCommentSubmit}
                            outline 
                        >Đăng</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewvideoSeach;
