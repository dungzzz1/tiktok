
import classNames from 'classnames/bind';
import styles from './EditUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faClose } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar, updateName, updateNameid, updateNametd } from '~/redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);
function EditUser({setisopen}) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    //avatar
    const [avatar, setAvatar] = useState("");
    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    //name
    const [name, setName] = useState(currentUser.name || '');
    const handleNameInputChange = (event) => {
        setName(event.target.value);
    };
    //tiêu đề
    const [nametd, setnametd] = useState(currentUser.nametd || '');
    const handlenametdChange = (event) => {
        setnametd(event.target.value);
    };
    const [nameid, setnameid] = useState(currentUser.nameid || '');
    const handlenameidChange = (event) => {
        setnameid(event.target.value);
    };
    const history = useNavigate()
    const handleSave = async () => {
        // Gửi yêu cầu PUT đến máy chủ để cập nhật tên người dùng
        const response = await axios.put(`/users/${currentUser._id}`, {
          name: name,
          nameid:nameid,
          nametd:nametd,
        });
        const updatedUser = response.data;
        dispatch(updateAvatar(avatar));
        //name
        setName(updatedUser.name);
        dispatch(updateName(updatedUser.name));
        //td
        setName(updatedUser.nametd);
        dispatch(updateNametd(updatedUser.nametd));
        //id
        setName(updatedUser.nameid);
        dispatch(updateNameid(updatedUser.nameid));
    };
    return ( 
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <FontAwesomeIcon className={cx('icon-close')} icon={faClose} onClick={() => setisopen(false)} />
                    <h1 className={cx('text')}>Sửa hồ sơ</h1>
                </div>
                <div className={cx('main')}>
                    <div className={cx('user')}>
                        <h3>Ảnh Hồ sơ</h3>
                        <img src={avatar || currentUser?.img}/>
                       <div className={cx('btn')} >
                            <input onChange={handleFileInputChange} type="file" />    
                            <FontAwesomeIcon className={cx('icon')} icon={faCamera} />
                       </div>
                    </div>
                    <div className={cx('user-i')} >
                        <h3>Zung ID</h3>
                        <input value={nameid} onChange={handlenameidChange} ></input>
                    </div>
                    <div className={cx('user-id')} >
                        <h3>Tên</h3>
                        <input value={name} onChange={handleNameInputChange} ></input>
                    </div>
                    <div className={cx('user-ts')} >
                        <h3>Tiểu sử</h3>
                        <input value={nametd} onChange={handlenametdChange} ></input>
                    </div>
                </div>
                <div className={cx('bottom')}>
                    <Button text smaill >Huỷ</Button>
                    <Button text smaill onClick={handleSave} primary >Lưu</Button>
                </div>
            </div>
        </div>
    );
}

export default EditUser;