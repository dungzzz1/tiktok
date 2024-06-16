import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '~/redux/UserSlice';
import './index.css'
const Logout = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  // Xử lý logout khi người dùng nhấn nút Logout
  const handleLogout = () => {
    dispatch(logout()); // Gửi action đến Redux Store để xóa thông tin đăng nhập của người dùng
    history('/'); // Chuyển hướng người dùng về trang đăng nhập
    window.location.reload(); 
  };
  const handleexitLogout = () => {
    history('/'); // Chuyển hướng người dùng về trang đăng nhập
  };

  return (
    <div className="container" >
      <div className="wrapper" >
      <h2>Bạn có chắc chắn muốn đăng xuất?</h2>
      <div className='hihi' >
      <button className="logout-button" onClick={handleexitLogout} >Huỷ</button>
      <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
      </div>
      </div>
    </div>
  );
};

export default Logout;