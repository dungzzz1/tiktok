import classNames from 'classnames/bind';
import styles from './Bottom.module.scss';
import ha from './ha.png'
const cx = classNames.bind(styles);
function Bottom() {
    return ( <div className={cx('container')} >
        <div className={cx('logo')} >
           <div className={cx('logo-img')} >
                <img src={ha} />
                <h3>Clone</h3>
           </div>
           <button>Tiếng Việt</button>
        </div>
        <div className={cx('title')} >
        <h3>Công Tinh</h3>
        <span>Dung Nhi</span>
        </div>
        <div className={cx('title')} >
        <h3>Liên Hệ</h3>
        <span>Đội 2 - Thượng Mỗ - Đan Phượng</span>
        <span>0393909639</span>
        </div>
        <div className={cx('title')} >
        <h3>Hỗ Trợ</h3>
        <span>Trung tâm Trợ giúp</span>
        <span>Trung tâm An toàn</span>
        <span>Creator Portal</span>
        <span>Accessibility</span>
        </div>
        <div className={cx('title')} >
        <h3>Chương Trình</h3>
        <span>clone for Good</span>
        <span>Quảng cáo</span>
        <span>clone Rewards</span>
        <span>clone Embeds</span>
        </div>
    </div> );
}

export default Bottom;