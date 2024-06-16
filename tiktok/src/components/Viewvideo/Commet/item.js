import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function Item({comment,channel,video}) {
    const isVideoUploader = video.userId === comment.userId;
    const [showAllComment, setShowAllComment] = useState(false);
    const toggleComment = () => {
        setShowAllComment(!showAllComment);
    };
    return (  
            <div className={cx('account-item-h1')}>
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
                            <button  onClick={toggleComment} ><span>trả lời </span></button>
                        </div>
                        {showAllComment && (
                            <div className={cx('tlcommet')} >
                            <input placeholder="Thêm Câu Trả Lời" ></input>
                            </div>
                        )}
                    </div>
                    </div>
                    <div className={cx('btn')} >
                        <FontAwesomeIcon className={cx('icon')} icon={faEllipsisV} />
                    </div>
                </div> 
);
}

export default Item;