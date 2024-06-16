import { useEffect, useMemo, useState  } from 'react';
import classNames from 'classnames/bind';
import slytes from './MainVideo.module.scss';
import VideoList from './video';
import './VideoCard.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const cx = classNames.bind(slytes);
function Follow() {
    const { currentUser } = useSelector((state) => state.user);
    const [videos ,setvideo] = useState([])
    useEffect(()=>{
        const fetchVideos = async ()=>{
            const res = await axios.get("/videos/sub")
            setvideo(res.data)
        }
        fetchVideos()
    },[])
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    // eslint-disable-next-line
    
    return (
        <div className={cx('container')} >
            <div className={cx('item')} >
             {videos.map((video) => (
                 <VideoList currentUser={currentUser} key={video._id} video={video} />
            ))}
         </div>
        </div>
    );
}
export const useElementOnScreen = (options, targetRef) => {
    const [isVisibile, setIsVisible] = useState()
    const callbackFunction = entries => {
        const [entry] = entries //const entry = entries[0]
        setIsVisible(entry.isIntersecting)
    }
    const optionsMemo = useMemo(() => {
        return options
    }, [options])
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo)
        const currentTarget = targetRef.current
        if (currentTarget) observer.observe(currentTarget)

        return () => {
        if(currentTarget) observer.unobserve(currentTarget)
        }
    }, [targetRef, optionsMemo])
    return isVisibile
}
export default Follow;
