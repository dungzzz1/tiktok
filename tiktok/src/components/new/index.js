import classNames from 'classnames/bind';
import styles from './New.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Newview from './new view';
import NewReview from './new review';
import NewFake from './new fake';
const cx = classNames.bind(styles);
function Newitem() {
    const [open, setopen] = useState(false);
    return ( 
        <div className={cx('new')} >
            <NewReview setopen={setopen}/>
            <div className={cx('new-right')} >
                <NewFake setopen={setopen} />
            </div>
            <div className={cx('new-right')} >
                <NewFake />
            </div>
            <div className={cx('new-right')} >
                <NewFake />
            </div>
            {open && <Newview setopen={setopen} />}
        </div>
    );
}

export default Newitem;