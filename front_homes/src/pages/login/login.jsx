import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/logo2.jpg';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-box">

          {/* 로고 영역 */}
          <div className="login-logo-wrapper">
            <img src={MainLogo} alt="메인 로고" className="center-logo" />
          </div>

          {/* 입력 폼 */}
          <div className="login-form">
            <input type="text" placeholder="전화번호 또는 이메일" />
            <input type="password" placeholder="비밀번호" />
            <button className="login-btn">로그인</button>
          </div>

          {/* 하단 버튼들 */}
          <div className="links">
            <button className="link-btn" onClick={() => navigate('/signup')}>
              회원가입
            </button>
            
            <span className="divider">|</span>
            
            <button className="link-btn" onClick={() => navigate('/find-pw')}>
              비밀번호 재설정
            </button>
            
            <span className="divider">|</span>
            
            <button className="link-btn" onClick={() => navigate('/find-id')}>
              계정찾기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;