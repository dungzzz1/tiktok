import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
function MenuItem({ title, to, icon,type,onClick }) {
    return (
        <NavLink type={type} className={(nav) => cx('menu-item',{active:nav.isActive})} to={to} onClick={onClick}>
            {icon}
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}
MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};
export default MenuItem;
