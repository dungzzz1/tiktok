import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Seachuser.module.scss';
const cx = classNames.bind(styles);

function UserSeach() {
    return ( 
        <div className={cx('acount')} >
            <div className={cx('acount-item')} >
                <div>  
                    <img src='https://pgddttieucan.edu.vn/wp-content/uploads/2022/01/anh-gai-dep-45.jpg' />
                </div>
                <div className={cx('acount-icon')} >
                    <h4>Mỹ đỗ Toa</h4>
                    <span>Thải Lân</span>
                    <p>hoạt hình 3d trung quốc</p>
                </div>
            </div>
        </div>
     );
}

export default UserSeach;