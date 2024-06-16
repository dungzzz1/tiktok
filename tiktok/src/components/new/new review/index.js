import classNames from 'classnames/bind';
import styles from '../New.module.scss';
const cx = classNames.bind(styles);
function NewReview({setopen}) {
    return ( 
        <div  onClick={() => setopen(true)} className={cx('new-left')} >
            <img src='https://neohouse.vn/wp-content/uploads/2022/04/hinh-anh-nha-dep-thuc-te-anh-bia.jpg' />
            <div className={cx('new-left-item')} ><p>Gửi đến các bạn đọc và khách hàng trọn bộ hình ảnh nhà đẹp thực tế của căn biệt thự 3 tầng 120m2 tại quận 12 Tp. HCM được NEOHouse triển khai thiết kế thi công trọn gói cho gia đình chị Thúy P. Đông Hưng Thuận, Q.12, Tp.HCM với kinh phí hoàn thiện kiến trúc 1,8 tỷ.</p>
            <p>Dưới đây chúng tôi chia sẻ đến các bạn hình ảnh nhà đẹp thực tế từ kiến trúc mặt tiền cho đến nội thất bên trong căn nhà biệt thự đẹp này.</p></div>
        </div>
    );
}

export default NewReview;