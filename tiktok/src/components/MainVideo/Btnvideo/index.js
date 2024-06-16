import classNames from 'classnames/bind';
import slytes from '../MainVideo.module.scss';
import { CommentIcon, FavouriteIcon, FavouritesIcon, HeartIcon, HeartResIcon, ShaseIcon } from '~/accset/icon';
import { FacebookShareButton } from 'react-share';
const cx = classNames.bind(slytes);
function BtnVideo({video,handleShare,handleview,handleLike,isLiked,likeCount,FavouriteCount,handleFavourite,isFavourite}) {
    return ( 
    <>
        <div className={cx('k')}>
                        <button onClick={handleLike} style={{background:'none'}}>
                            <div className={cx('h')}>
                                { isLiked  ? <HeartResIcon /> : <HeartIcon />}
                            </div>
                        </button>
                        <span>{likeCount}</span>
                    </div>
                    <div onClick={handleview} className={cx('k')}>
                        <div className={cx('h')}>
                            <CommentIcon />
                        </div>
                        <span>4</span>
                    </div>
                    <div className={cx('k')}>
                        <button onClick={handleFavourite}  style={{background:'none'}} >
                            <div  className={cx('h')}>
                                {isFavourite ? <FavouritesIcon /> : <FavouriteIcon /> }
                            </div>
                            <span>{FavouriteCount}</span>
                        </button>
                    </div>
                    <div className={cx('k')}>
                        <div className={cx('h')}>
                        <FacebookShareButton url={video.videoUrl} quote={video.title} onClick={handleShare}> 
                            <ShaseIcon />
                        </FacebookShareButton>  
                    </div>
                    <span>{video.shares.length}</span>
            </div>
        </>
    );
}

export default BtnVideo;