import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Explore.module.scss';
import Viewsong from './Videoitem/viewsong';
import Listsong from './Videoitem/listsong';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faForwardFast, faForwardStep, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Datasong from './data/songs.json';
import Dksong from './Videoitem/dk';
import { Songs } from './Context';

const cx = classNames.bind(styles);

function IsExplore() {
  const [song, setsong] = useState(Datasong[0]);
  const handleSetSong = (idsong) => {
    const song = Datasong.find((song) => song.id === idsong);
    if(!song){
      setsong(Datasong[0])
    }else{
      setsong(song);
    }
  };
  return (
   <Songs.Provider value={{Datasong ,song,handleSetSong}} >
     <div className={cx('wrapper')}>
      <div className={cx('wrapper-menu')}>
        <Viewsong />
        <div className={cx('menu-song')}>
          <Listsong  />
        </div>
      </div>
      <Dksong />
    </div>
   </Songs.Provider>
  );
}

export default IsExplore;