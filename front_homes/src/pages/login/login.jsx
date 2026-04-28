import React from 'react';
import './login.css';
// logo2.jpg 파일 불러오기
import MainLogo from '../../assets/logo2.jpg'; 

function Login() {
  return (
    <div className="container">
      <div className="login-container">
        <div className="login-box">
          
          {/* 로고 영역 */}
          <div className="login-logo-wrapper">
            <img src={MainLogo} alt="메인 로고" className="center-logo" />
          </div>

          <div className="login-form">
            <input type="text" placeholder="전화번호 또는 이메일" />
            <input type="password" placeholder="비밀번호" />
            <button className="login-btn">로그인</button>
          </div>

          <div className="links">
            <span>회원가입</span>
            <span className="divider">|</span>
            <span>비밀번호 재설정</span>
            <span className="divider">|</span>
            <span>계정찾기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;