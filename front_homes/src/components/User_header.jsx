import './User_header.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {

  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header_inner">

        <div className="header_left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/main_logo.jpg" alt="메인 로고" className="header_logo" />
        </div>

        <div className="header_right">

          {/* 로그인 안된 상태 */}
          {!isLogin && (
            <>
              <button
                className="header_login_button"
                onClick={() => navigate('/login')}
              >
                로그인
              </button>

              <button
                className="header_signup_button"
                onClick={() => navigate('/signup')}
              >
                회원가입
              </button>
            </>
          )}

          {/* 로그인 된 상태 */}
          {isLogin && (
            <>
              <button
                className="header_host_button"
                onClick={() => setIsLogin(false)}
              >
                로그아웃
              </button>
              <button
                className="header_mypage_button"
                onClick={() => navigate('/mypage')}
              >
                마이페이지
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  )
}

export default Header