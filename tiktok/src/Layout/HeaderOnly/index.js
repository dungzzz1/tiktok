import Bottom from "../components/Bottom";
import Header from "../components/Header";
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
const cx = classNames.bind(styles)
function HeaderOnly({ children }) {
    return (
        <div className={cx('top')} >
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
          <div className={cx('bottom')} >
            <Bottom />
          </div>
        </div>
     
    );
}

export default HeaderOnly;
