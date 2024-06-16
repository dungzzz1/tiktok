
import routes from '~/config';
import {
    HomeIcon,
    FlollowIcon,
    DiscoverIcon,
    LiveIcon,
    FacebookIcon,
    TwiterIcon,
    Gmailcon,
    InstagamIcon,
    MusicIcon,
} from '~/accset/icon';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import UserFollowing from '~/components/UserFollowing/UserFollowing';
import Button from '~/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '~/redux/UserSlice';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faMusic, faNewspaper } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const handleClick = () => {
        if (!isLoggedIn) {
            window.location.href = '/'; // Chuyển hướng đến trang '/'
        } else {
            window.location.href = routes.following; // Chuyển hướng đến trang được định nghĩa trong routes.following
        }
    };
    return (
        <div className="container">
        <div className={cx('wrapper')}>
            <div className={cx('text-table')} >
                <h4>Your video</h4>
            </div>
            <Menu >
                <MenuItem type="random" title="Dành cho bạn" to={routes.home} icon={<HomeIcon />} />
                <MenuItem onClick={handleClick} title="Đang Flollow" to={routes.following} icon={<FlollowIcon />} />
                <MenuItem title="LIVE" to={routes.Live} icon={<LiveIcon />} />
            </Menu>
            <UserFollowing lable="Các tài khoản đang follow" />
            <div className={cx('text-table')} >
                <h4>Your Music</h4>
            </div>
            <div className={cx('bottom')}>
               <div style={{marginBottom:'20px'}} >
               <Menu >
                    <MenuItem title="Âm Nhạc" to={routes.Explore} icon={ <FontAwesomeIcon icon={faMusic} />} />
                    <MenuItem title="New" to={routes.New} icon={ <FontAwesomeIcon icon={faNewspaper} />} />
                </Menu>
               </div>
                <div className={cx('text-table')} >
                    <h4>Contact</h4>
                </div>
                <div className={cx('bottom-btn')}>
                    <div className={cx('bottom-btn-text')} >
                    <Link to="https://www.facebook.com/profile.php?id=100019270655971">
                        <FacebookIcon />
                    </Link>
                        <h3>facebook</h3>
                    </div>
                    <div className={cx('bottom-btn-text')} >
                    <Link to="https://mail.google.com/mail/u/0/">
                        <Gmailcon />
                    </Link>
                        <h3>Gmail</h3>
                    </div>
                    <div className={cx('bottom-btn-text')} >
                    <Link to="https://twitter.com/?lang=vi">
                        <TwiterIcon />
                    </Link>
                        <h3>Twitter</h3>
                    </div>
                    <div className={cx('bottom-btn-text')} >
                    <Link to="https://www.instagram.com/">
                        <InstagamIcon />
                    </Link>
                        <h3>Instagram</h3>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
}

export default Sidebar;
