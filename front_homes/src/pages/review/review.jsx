import React, { useState, useRef } from 'react';
import './review.css'; 
import Header from "../../components/User_header";

const review = () => {
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);   
  const [keywords, setKeywords] = useState("");
  const [comment, setComment] = useState("");
  const fileInputRef = useRef(null);

  const handleMouseMove = (e, index) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    const value = percent <= 0.5 ? index + 0.5 : index + 1;
    setHover(value);
  };

  const handleClick = (value) => {
    setRating(value);
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="main-wrapper">
      <Header />

      <main className="review-container">
        <h2 className="page-title">리뷰 작성</h2>

        {/* 1. 상단 통계 박스 (고정 1000px) */}
        <section className="box-item stats-section">
          <div className="avg-rating-column">
            <span className="building-name">안서동 햇살빌라</span>
            <span className="avg-value">4.0</span>
            <div className="static-stars">★★★★★</div>
          </div>

          <div className="count-info-column">
            <div className="gray-card">
              <p>리뷰등록: 4건</p>
              <p>포토리뷰: 1건</p>
              <p>조회수: 20</p>
            </div>
          </div>

          <div className="graph-column">
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="graph-row">
                <span className="graph-label">{num}</span>
                <div className="bar-background">
                  <div className={`bar-fill fill-${num}`}></div>
                </div>
                <span className="graph-count">
                  {num === 5 || num === 4 ? '2명' : num === 2 ? '1명' : '0명'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 별점 및 키워드 작성 박스 (독립된 박스) */}
        <section className="box-item form-top-row">
          <div className="star-input-group">
            <span className="form-label">어떠셨나요?</span>
            <div className="interactive-star-rating">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="star-wrapper"
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => handleClick(hover)}
                >
                  <span className={`star-icon ${(hover || rating) > i ? 'active' : ''}`}>★</span>
                  {(hover || rating) > i && (hover || rating) < i + 1 && <span className="star-half">★</span>}
                </div>
              ))}
            </div>
          </div>
          
          <div className="keyword-input-group">
            <span className="form-label">키워드 작성</span>
            <input 
              type="text" 
              placeholder="# 최대 3개 작성" 
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="actual-keyword-input"
            />
          </div>
        </section>

        {/* 3. 리뷰 본문 박스 (위 박스와 완전히 분리) */}
        <section className="box-item form-textarea-group">
          <textarea 
            placeholder="10자 이상 작성해주세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="actual-textarea"
          ></textarea>
        </section>

        {/* 4. 하단 버튼 영역 */}
        <div className="form-action-row">
          <button type="button" className="camera-attach-btn" onClick={handleCameraClick}>
            📷
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
          </button>
          <button type="button" className="review-submit-btn">리뷰 등록</button>
        </div>
      </main>
    </div>
  );
};

export default review;