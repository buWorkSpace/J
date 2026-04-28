import './User_header.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header_inner">
        {/* 로고 영역 */}
        <div 
          className="header_left" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        >
          <img src="/main_logo.jpg" alt="메인 로고" className="header_logo" />
        </div>

        {/* 버튼 영역 */}
        <div className="header_right">
          {!isLogin ? (
            <>
              <button 
                className="header_mypage_button" 
                onClick={() => navigate('/mypage')}
              >
                마이페이지
              </button>

              <div className="header_auth_group">
                <button 
                  className="header_login_button" 
                  onClick={() => navigate('/login')}
                >
                  로그인
                </button>
                
                <span className="divider"></span>
                
                <button 
                  className="header_signup_button" 
                  onClick={() => navigate('/signup')}
                >
                  회원가입
                </button>
              </div>
            </>
          ) : (
            <button 
              className="header_logout_button" 
              onClick={() => setIsLogin(false)}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;