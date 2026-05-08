import "./User_header.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true",
  );

  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const checkLogin = () => {
      setIsLogin(localStorage.getItem("isLogin") === "true");
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", checkLogin);
    window.addEventListener("loginChange", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("loginChange", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("role");

    setIsLogin(false);
    setRole(null);

    window.dispatchEvent(new Event("loginChange"));
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header_inner">
        <div
          className="header_left"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/main_logo.jpg" alt="메인 로고" className="header_logo" />
        </div>

        <div className="header_right">
          {!isLogin ? (
            <div className="header_auth_group">
              <button
                className="header_login_button"
                onClick={() => navigate("/login")}
              >
                로그인
              </button>

              <span className="divider"></span>

              <button
                className="header_signup_button"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </button>
            </div>
          ) : (
            <>
              {role === "admin" ? (
                <button
                  className="header_mypage_button"
                  onClick={() => navigate("/admin")}
                >
                  관리자페이지
                </button>
              ) : (
                <button
                  className="header_mypage_button"
                  onClick={() => navigate("/mypage")}
                >
                  마이페이지
                </button>
              )}

              <button className="header_logout_button" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
