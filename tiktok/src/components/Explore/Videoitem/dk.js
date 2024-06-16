import classNames from 'classnames/bind';
import styles from './Videoitem.module.scss';
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { useContext } from 'react';
import { Songs } from '../Context';
const cx = classNames.bind(styles);
function Dksong() {
  const {song,handleSetSong} = useContext(Songs)
  const handleClicknext = () =>{
    handleSetSong(song.id +1)
  }
  const handleClicknextPrevious = () =>{
    handleSetSong(song.id - 1)
  }
    return ( 
        <div className={cx('song')} >
          <div className={cx('song-input')} >
          <AudioPlayer src={song.url} layout="stacked-reverse" onClickNext={handleClicknext} onClickPrevious={handleClicknextPrevious} showSkipControls={true} showJumpControls={false}/>
          </div>
      </div>
    );
}
export default Dksong;