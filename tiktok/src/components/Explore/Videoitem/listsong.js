import classNames from 'classnames/bind';
import styles from './Videoitem.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Songs } from '../Context';

const cx = classNames.bind(styles);

function Listsong() {
    const {Datasong,handleSetSong,song} = useContext(Songs)
    const [idsong, setSong] = useState(0);
    const handePlaySong = (idsong) => {
        setSong(idsong);
        handleSetSong(idsong);
    };
    useEffect(()=>{
        setSong(song.id)
    },[song])
  return (
   <>
    {Datasong.map((song,index)=>(
        <div key={index} className={cx('menu-list-song',{ active: idsong === song.id })} onClick={() => handePlaySong(song.id)} >
        <div className={cx('song-id')}>
          <span>{index + 1}</span>
        </div>
        <img src={song.links.images[0].url} />
        <table>{song.name}</table>
        <div className={cx('song-time')}>
          <span>3.23</span>
        </div>
      </div>))}
   </>
  );
}

export default Listsong;