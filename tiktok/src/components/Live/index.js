import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Live.module.scss';
import IsItem from './LiveItem';
const cx = classNames.bind(styles);
function IsLive() {
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
    return ( 
      <div className={cx('live')}>
        <div className={cx('live-menu')}>
          <button
            className={cx('btn1', { active: activeTab === 'tab1' })}
            onClick={() => handleTabClick('tab1')}
          >
            Dành Cho Bạn
          </button>
          <button
            className={cx('btn', { active: activeTab === 'tab2' })}
            onClick={() => handleTabClick('tab2')}
          >
             Đang Fllow
          </button>
        </div>
      <div>
        {activeTab === 'tab1' && <div><IsItem/></div>} 
        {activeTab === 'tab2' && <div><IsItem /></div>}
      </div>
    </div>
    );
}

export default IsLive;