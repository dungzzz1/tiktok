import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import routsconfig from '~/config/index';
import styles from './Header.module.scss';
import images, { Messger, TextCall } from '~/accset/icon';
import ha from './ha.png'
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faKeyboard, faMoon, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCoins, faEarthAsia, faEllipsisVertical, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Menuitem from '~/components/Popper/MenuItems';
import Seach from '../Seach';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Login from '~/pages/Login';
import { selectIsLoggedIn } from '~/redux/UserSlice';


const cx = classNames.bind(styles);
const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon className={cx('icon-menu')} icon={faEarthAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon className={cx('icon-menu')} icon={faCircleQuestion} />,
        title: 'Phản Hồi và Trợ Giúp',
        to: '',
    },
    {
        icon: <FontAwesomeIcon className={cx('icon-menu')} icon={faKeyboard} />,
        title: 'Phím Tắt Trên Bàn Phím',
    },
    {
        icon: <FontAwesomeIcon className={cx('icon-menu')} icon={faMoon} />,
        title: 'Chế Độ Tối',
    },
];

const Usermenu = [
    {
        icon: <FontAwesomeIcon className={cx('icon-menu')} icon={faUser} />,
        title: 'Xem Hồ Sơ',
        to: `${routsconfig.FileUser}`,
    },
    {
        icon: <FontAwesomeIcon className={cx('icon-menu')} icon={faCoins} />,
        title: 'Nhận Xu',
        to: '',
    },
    {
        icon: <FontAwesomeIcon className={cx('icon-menu')} icon={faGear} />,
        title: 'Cài Đặt',
        to: '',
    },
    ...MENU_ITEM,
    {
        icon: <FontAwesomeIcon className={cx('icon-menu')} icon={faSignOut} />,
        title: 'Đăng Xuất',
        to: `${routsconfig.Logout}`,
    },
];
function Header() {
        const { currentUser } = useSelector((state) => state.user);
        const [open, setopen] = useState(false);
        // const isLoggedIn = useSelector(state => state.user.isLoggedIn);
        const history = useNavigate();
        const isLoggedIn = useSelector(selectIsLoggedIn);
        const handleClick = () => {
            if (!isLoggedIn) {
                setopen(true)
              } else {
               history('/uploadvideo')
            }
        };
    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Link to={routsconfig.home} className={cx('logo')}>
                        <img src={ha} alt="tiktok" />
                        <h3>Relax</h3>
                    </Link>
                    <Seach />
                    <div className={cx('account')}>
                        {currentUser ? (
                            <>
                                <div className={cx('btn')}>
                                    <Button onClick={handleClick} text>Tải Liên</Button>
                                </div>
                                <Tippy delay={[0, 200]} content="Tin Nhắn">
                                    <button className={cx('account-item')}>
                                        <TextCall />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 200]} content="Hộp Thư">
                                    <button className={cx('account-item')}>
                                        <Messger />
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Button onClick={handleClick} text>Tải Liên</Button>
                                <Button primary onClick={() => setopen(true)}>
                                    Đăng Nhập
                                </Button>
                            </>
                        )}
                        <Menuitem items={currentUser ? Usermenu : MENU_ITEM}>
                            {currentUser ? (
                                <img
                                    src={currentUser.img}
                                    className={cx('avatar')}
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />{' '}
                                </button>
                            )}
                        </Menuitem>
                    </div>
                </div>
            </header>
            {open && <Login setopen={setopen} />}
        </>
    );
}

export default Header;
