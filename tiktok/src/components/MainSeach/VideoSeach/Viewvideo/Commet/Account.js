import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { useEffect, useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Item from './item';
import HealessTippy from '@tippyjs/react/headless';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '~/redux/UserSlice';
const cx = classNames.bind(styles);

function AccountComment({comment,video,newComment}) {
    const [channel ,setchannel] = useState({})
    const { currentUser } = useSelector((state) => state.user);
    const isVideoUploader = video.userId === comment.userId;
    const isUploader = currentUser && currentUser._id === video.userId;
    const [showAllComments, setShowAllComments] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showComment, setShowComment] = useState();
    useEffect(()=>{
        const fetchCommet = async ()=>{
            const res = await axios.get(`/users/find/${comment.userId}`)
            setchannel(res.data)
        }
        fetchCommet()
    },[comment.userId,setchannel,newComment])
    const toggleComments = () => {
        setShowAllComments(!showAllComments);
    };
    const toggle = () => {
        setShowComments(!showComments);
        setShowAllComments(false); 
    };
    const handleDeleteComment = async () => {
        try {
            if (comment && comment._id) {
                const response = await axios.delete(`/commnets/${comment._id}`);
                console.log('Comment deleted successfully!', response.data);
                setShowComment(comment._id)
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }; 
    const canDeleteComment = () => {
        if (currentUser && currentUser._id === comment.userId) {
          return true; // User is logged in and the comment belongs to them
        }
        if (isUploader) {
          return true; // User is the uploader of the video
        }
        return false;
      };
    return ( 
        <div className={cx('account-item')}>
        <img
            className={cx('avatar')}
            src={channel.img}
        />
        <div className={cx('item-into')}>
            <div className={cx('item')} >
                <p className={cx('nickname')}>
                    <strong>{channel.name}</strong>
                    {isVideoUploader && <span>tác giả</span>}
                </p>
                <p className={cx('name')}>{comment.desc}</p>
            </div>
            <div className={cx('tl')} >
                <div>
                    <span>5-12</span>
                    <button  onClick={toggleComments} ><span>trả lời </span></button>
                </div>
                {showAllComments && (
                    <div className={cx('tlcommet')} >
                    <input placeholder="Thêm Câu Trả Lời" ></input>
                    </div>
                )}
                {!showComments && (
                    <button>
                        <span onClick={toggle}>Xem thêm</span>
                    </button>
                )}
                {showComments && (
                    <Item comment={comment} channel={channel} video={video} />
                    )}
            </div>
        </div>
        <div className={cx('btn')}>
            <HealessTippy
                delay={[0, 200]}
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('btn-delete')} tabIndex="-1" {...attrs}>
                    {canDeleteComment() && ( 
                        <PopperWrapper>
                            <div className={cx('btn-td')}>
                            <Button text onClick={handleDeleteComment}>
                                        Xoá
                                    </Button>
                                {/* {isLoggedIn ? (
                                    <Button text onClick={() => handleDeleteComment(comment._id)}>
                                        Xoá
                                    </Button>
                                ) : (
                                    <Button text>Báo Cáo</Button>
                                )}*/}
                            </div> 
                        </PopperWrapper>
                    )}
                    </div>
                )}
                >
                <div>
                    <FontAwesomeIcon
                    className={cx('icon')}
                    icon={faEllipsisV}
                    />
                </div>
            </HealessTippy>
        </div>
    </div>
    );
}

export default AccountComment;