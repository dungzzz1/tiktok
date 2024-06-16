import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AccountComment from './Account';
import { useDispatch } from 'react-redux';
import { fetchSuccess } from '~/redux/VideoSlice';
const cx = classNames.bind(styles);
function Commenuser({video,newComment}) {
    const [comments ,setcommnet] = useState([])
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCommet = async ()=>{
            const res = await axios.get(`/commnets/${video._id}`)
            const fetchedComments = res.data;
            dispatch(fetchSuccess(fetchedComments));
            setcommnet(fetchedComments);
        }
        fetchCommet()
    },[video._id,dispatch,newComment])
    return (
        <>
        {comments.map(comment=>(
            <AccountComment newComment={newComment} video={video} comment={comment} key={comment._id} />
        ))}
        </>
    );
}
Commenuser.prototype = {};
export default Commenuser;
