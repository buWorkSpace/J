import './User_header.css'
import { useState } from 'react'

function Header() {

  const [isLogin, setIsLogin] = useState(false)

  return (
    <header className="header">
      <div className="header_inner">

        <div className="header_left">
          <img src="/main_logo.jpg" alt="메인 로고" className="header_logo" />
        </div>

        <div className="header_right">

          {/* 로그인 안된 상태 */}
          {!isLogin && (
            <>
              <button 
                className="header_login_button"
                onClick={() => setIsLogin(true)}
              >
                로그인
              </button>

              <button className="header_signup_button">
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