import './login.css'; 

function Login() {
  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <span className="title">
            알려줘 <span className="orange">홈즈</span>
          </span>
        </div>

        <div className="header-right">
          <button>마이페이지</button>
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </header>

      <div className="login-container">
        <div className="login-box">
          <input type="text" placeholder="전화번호 또는 이메일" />
          <input type="password" placeholder="비밀번호" />

          <button className="login-btn">로그인</button>

          <div className="links">
            <span>회원가입</span>
            <span>|</span>
            <span>비밀번호 재설정</span>
            <span>|</span>
            <span>계정찾기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;