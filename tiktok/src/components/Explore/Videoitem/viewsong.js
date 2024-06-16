import classNames from 'classnames/bind';
import styles from './Videoitem.module.scss';
import { useContext } from 'react';
import { Songs } from '../Context';
const cx = classNames.bind(styles);
function Viewsong() {
    const {song} = useContext(Songs)
    return ( 
        <div className={cx('menu-song')} >
            <img src={song.links.images[0].url} />
            <h5>{song.name}</h5>
        </div>
    );
}
export default Viewsong;