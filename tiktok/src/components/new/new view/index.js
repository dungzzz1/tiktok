import classNames from 'classnames/bind';
import styles from '../New.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Newview({setopen}) {
    return ( 
        <div className={cx('new-view')} >
            <div className={cx('new-view-item')} >
                <FontAwesomeIcon className={cx('icon-close')} icon={faClose} onClick={() => setopen(false)} />
                    <div className={cx('new-view-table')} >
                        <div className={cx('new-view-img')} >
                        <img src='https://neohouse.vn/wp-content/uploads/2022/04/hinh-anh-nha-dep-thuc-te-anh-bia.jpg' />
                        </div>
                        <div className={cx('new-view-text')} >
                            <p>
                            Gửi đến các bạn đọc và khách hàng trọn bộ hình ảnh nhà đẹp thực tế của căn biệt thự 3 tầng 120m2 tại quận 12 Tp. HCM được NEOHouse triển khai thiết kế thi công trọn gói cho gia đình chị Thúy P. Đông Hưng Thuận, Q.12, Tp.HCM với kinh phí hoàn thiện kiến trúc 1,8 tỷ.
                            Gửi đến các bạn đọc và khách hàng trọn bộ hình ảnh nhà đẹp thực tế của căn biệt thự 3 tầng 120m2 tại quận 12 Tp. HCM được NEOHouse triển khai thiết kế thi công trọn gói cho gia đình chị Thúy P. Đông Hưng Thuận, Q.12, Tp.HCM với kinh phí hoàn thiện kiến trúc 1,8 tỷ.
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Newview;