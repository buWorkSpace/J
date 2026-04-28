import React from 'react';
import './signup.css';

const RegisterPage = () => {
  return (
    <div className="register-container">
      {/* 부모인 register-container가 flex이므로, 
          바로 아래 자식인 form-card가 화면 정중앙에 위치하게 됩니다. */}
      <div className="form-card">
        <h2 className="form-title">회원정보 입력</h2>
        
        <form className="register-form">
          {/* 이름 입력 */}
          <div className="input-group">
            <label>이름</label>
            <input type="text" placeholder="이름 입력" />
          </div>

          {/* 비밀번호 입력 */}
          <div className="input-group">
            <label>비밀번호</label>
            <input type="password" placeholder="8자리 이상 입력해주세요" className="mb-xs" />
            <input type="password" placeholder="비밀번호 확인" />
          </div>

          {/* 전화번호 입력 */}
          <div className="input-group">
            <label>전화번호</label>
            <input type="tel" placeholder="010-1234-5678" />
          </div>

          {/* 이메일 입력 */}
          <div className="input-group">
            <label>이메일</label>
            <input type="email" placeholder="이메일 입력" />
          </div>

          {/* 파일 첨부 */}
          <div className="input-group">
            <label>부동산 계약서 첨부</label>
            <div className="file-input-wrapper">
              <input type="text" placeholder="파일 선택" readOnly />
              <span className="link-icon">🔗</span>
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <button type="submit" className="submit-button">
            회원가입 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;