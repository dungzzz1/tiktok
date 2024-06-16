import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Account({user}) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src={user.img} alt="" />
            <div className={cx('infor')}>
                <p className={cx('name')}>
                    <span>{user.name}</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <span className={cx('usename')}>{user.nameid}</span>
            </div>
        </div>
    );
}

export default Account;
