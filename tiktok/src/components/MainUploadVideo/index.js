import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "~/filebase/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classNames from 'classnames/bind';
import slytes from './Mainloadvideo.module.scss';
import './index.css'
const cx = classNames.bind(slytes);
const MainUploadVideo = () => {
  const [video, setVideo] = useState(undefined);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (urlType === "videoUrl") {
          setVideoPerc(Math.round(progress));
        }
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
            default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/videos", { ...inputs });
      if (res.status === 200) {
        navigate('/FileUser');
      }
    } catch (error) {
      console.error(error);
    }
  };
  //css reatc
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleCancel = () => {
    setVideoFile(null);
    setUploadProgress(0);
  };

  const handleSelect = (e) => {
    const file = e.target.files[0];
    setVideo(e.target.files[0])
    if (file) {
      setVideoFile(file);
      setUploadProgress(0);
    }
  };
  const suggestions = ['#xuhuong', '#girl', '#xuhuongtiktok', '#xuhuong2023', '#Dungnhi'];
  const suggestion = [
    'original sound - Chiro',
    'perfect loop sound - ducks_in_space', 
    ' 𝙏𝙧𝙪𝙤𝙣𝙜𝙢𝙞𝙡𝙖𝙣𝙤🎶', 
    'ciro ciro - 𝙯𝙤𝙧𝙤𝙟𝙪𝙧𝙤 ゾロ', 
    '𝐎𝐯𝐞𝐫 𝐑𝐢𝐠𝐡𝐭 ⚜️',
    '陈草 - _陈草✨',
  ];
  return (
<div className={cx('container')} >
    <div className={cx('wapper')} >
      <div className={cx('container-top')} >
        <h1>Tải video lên</h1>
        <span>Đăng video vào tài khoản của bạn</span>
      </div>
      <div className={cx('container-bottom')} >
            <div className="upload-wrapper">
                {videoPerc > 0 ? (
                    <div className="upload-preview">
                    <video className="upload-video" src={videoFile && URL.createObjectURL(videoFile)} controls   onChange={(e) => setVideo(e.target.files[0])} />
                    <div className="upload-controls">
                        <div
                        className="upload-progress"
                        style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    </div>
                ) : (
                    <div className="upload-select">
                    <div className="upload-icon"></div>
                    <div className="upload-text">Chọn video để tải lên</div>
                    <input type="file" className="upload-input" accept="video/*" onChange={handleSelect} />
                    </div>
                )}
            </div>
            <div className={cx('title')} >
                   <div className={cx('title-input')} >
                    <h4>Chú Thích</h4>
                    <input type='text' name="title"  onChange={handleChange} />
                   </div>
                   <div className={cx('title-input')} >
                    <h4>Tags</h4>
                   <input list="suggestions" minLength={10}  name="tags"  rows={8} onChange={handleChange} />
                    <datalist id="suggestions">
                    {suggestions.map((suggestion, i) => (
                      <option key={i} value={suggestion} />
                    ))}
                    </datalist> 
                   </div>
                   <div className={cx('title-input')} >
                    <h4>Link Nhạc</h4>
                    <input list="suggestion"  type='text' name="link"  onChange={handleChange} />
                    <datalist id="suggestion">
                    {suggestion.map((suggestio, i) => (
                      <option key={i} value={suggestio} />
                    ))}
                    </datalist> 
                   </div>
                   <div className={cx('btn')} >
                   <button className="upload-cancel" onClick={handleCancel}>
                        Thay Đổi
                    </button>
                    <button  onClick={handleUpload} className="upload-cancel" >
                        Uploadvideo
                    </button>
                </div>
            </div>
      </div>
    </div>
</div>
  );
};

export default MainUploadVideo;