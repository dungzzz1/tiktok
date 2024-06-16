import classNames from 'classnames/bind';
import styles from '../New.module.scss';
const cx = classNames.bind(styles);
function NewFake({setopen}) {
    return ( 
        <div  onClick={() => setopen(true)} className={cx('new-right-item')} >
        <img src='https://neohouse.vn/wp-content/uploads/2022/04/hinh-anh-nha-dep-thuc-te-anh-10.jpg' />
        <p>Gửi đến các bạn đọc và khách hàng trọn bộ hình ảnh nhà đẹp thực tế của căn biệt thự 3 tầng 120m2 tại quận 12 Tp. HCM được NEOHouse triển khai thiết kế thi công trọn gói cho gia đình chị Thúy P. Đông Hưng Thuận, Q.12, Tp.HCM với kinh phí hoàn thiện kiến trúc 1,8 tỷ.</p>
        </div>
    );
}

export default NewFake;