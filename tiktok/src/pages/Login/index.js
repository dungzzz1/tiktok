import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import LoginTK from '~/components/Login';
const cx = classNames.bind(styles);
function Login({ setopen }) {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <FontAwesomeIcon className={cx('icon-close')} icon={faClose} onClick={() => setopen(false)} />
                <h1 className={cx('text')}>Đăng nhập DN</h1>
                <div className={cx('main')}>
                    <LoginTK setopen={setopen} />
                </div>
                <div className={cx('bottom')}>
                    <p>Bạn không có tài khoản? </p>
                    <p className={cx('text-btn')}>Đăng ký</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
