import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import classNames from 'classnames/bind';
import styles from './Defaultlayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const threshold = 300;
  
      if (scrollTop > threshold) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    return (
        <div className={cx('wrapper')} >
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
                {showScrollToTop && (
                    <div className={cx('scroll-to-top')} onClick={scrollToTop}>
                        <FontAwesomeIcon className={cx('icon')}  icon={faRotate} />
                    </div>
                )}
            </div>
    );
}

export default DefaultLayout;
