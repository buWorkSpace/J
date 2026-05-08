import React, { useState, useRef } from 'react';
import './signup.css';

const RegisterPage = () => {
  // 1. 상태 및 참조 설정
  const [fileName, setFileName] = useState(''); // 파일 이름 저장
  const fileInputRef = useRef(null); // 실제 파일 input 연결

  // 2. 🔗 아이콘(버튼) 클릭 시 파일 선택창 띄우기
  const handleFileButtonClick = (e) => {
    e.preventDefault(); // 폼 제출 방지
    fileInputRef.current.click();
  };

  // 3. 파일이 선택되었을 때 실행되는 함수
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // 선택한 파일 이름을 화면에 표시
    }
  };

  return (
    <div className="register-container">
      <div className="form-card">
        <h2 className="form-title">회원정보 입력</h2>
        
        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>이름</label>
            <input type="text" placeholder="이름 입력" />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input type="password" placeholder="8자리 이상 입력해주세요" className="mb-xs" />
            <input type="password" placeholder="비밀번호 확인" />
          </div>

          <div className="input-group">
            <label>전화번호</label>
            <input type="tel" placeholder="010-1234-5678" />
          </div>

          <div className="input-group">
            <label>이메일</label>
            <input type="email" placeholder="이메일 입력" />
          </div>

          {/* 파일 첨부 부분 */}
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              부동산 계약서 첨부
              {/* 🔗 버튼 역할 */}
              <button 
                type="button"
                onClick={handleFileButtonClick}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="파일 첨부"
              >
                🔗
              </button>
            </label>
            
            <div className="file-input-wrapper">
              <input 
                type="text" 
                placeholder="파일 선택" 
                value={fileName} 
                readOnly 
              />
              {/* 실제 파일 선택 기능 (숨겨짐) */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*, .pdf"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            회원가입 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;