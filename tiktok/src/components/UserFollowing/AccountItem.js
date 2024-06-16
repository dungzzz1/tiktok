import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './UserFollowing.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);
function AccountItem({userflo}) {
    return (
        <div className={cx('account-item')}>
            <img
                className={cx('avatar')}
                src={userflo.img}
                alt='hih'
            />
            <div className={cx('item-into')} >
                <p className={cx('nickname')} >
                    <strong>{userflo.name}</strong>
                    {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
                </p>
                <p className={cx('name')} >{userflo.nameid}</p>
            </div>
        </div>
    );
}
AccountItem.prototype = {};
export default AccountItem;
