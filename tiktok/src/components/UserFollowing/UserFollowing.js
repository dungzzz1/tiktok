import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './UserFollowing.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function UserFollowing({ lable }) {
    const { currentUser } = useSelector((state) => state.user);
    const [userflo ,setuserflo] = useState([])
    useEffect(() => {
        const fetchVideos = async () => {
          const res = await axios.get(`/users/folowing/${currentUser._id}`);
            setuserflo(res.data);
        };
        fetchVideos();
      }, [userflo]);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('lable')}>{lable}</p>
            {userflo.map((userflo,index) => (
                        <AccountItem userflo={userflo}  key={userflo._id} />
                ))}
            <p className={cx('more-btn')} >Xem Thêm</p>
        </div>
    );
}
UserFollowing.prototype = {
    lable: PropTypes.string.isRequired,
};
export default UserFollowing;
