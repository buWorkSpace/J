import React from "react";
import UserHeader from "../../components/User_header";
import "./login.css";
import { useNavigate } from "react-router-dom";
import MainLogo from "../../assets/logo2.jpg";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("role", role);

    window.dispatchEvent(new Event("loginChange"));

    if (role === "admin") {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <UserHeader />

      <div className="login-container">
        <div className="login-box">
          <div className="login-logo-wrapper">
            <img src={MainLogo} alt="메인 로고" className="center-logo" />
          </div>

          <div className="login-form">
            <input type="text" placeholder="전화번호 또는 이메일" />
            <input type="password" placeholder="비밀번호" />

            <button className="login-btn" onClick={() => handleLogin("user")}>
              사용자 로그인
            </button>

            <button
              className="admin-login-btn"
              onClick={() => handleLogin("admin")}
            >
              관리자 로그인
            </button>
          </div>

          <div className="links">
            <button className="link-btn" onClick={() => navigate("/signup")}>
              회원가입
            </button>

            <span className="divider">|</span>

            <button className="link-btn" onClick={() => navigate("/find-pw")}>
              비밀번호 재설정
            </button>

            <span className="divider">|</span>

            <button className="link-btn" onClick={() => navigate("/find-id")}>
              계정찾기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
