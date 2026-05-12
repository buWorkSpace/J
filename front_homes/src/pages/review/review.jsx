import React, { useState, useRef } from 'react';
import './review.css'; 
import Header from "../../components/User_header";

const Review = () => {
  const [rating, setRating] = useState(4); 
  const [hover, setHover] = useState(0);   
  const [keywords, setKeywords] = useState("");
  const [comment, setComment] = useState("");
  const fileInputRef = useRef(null);

  const handleMouseMove = (index) => {
    setHover(index + 1);
  };

  const handleClick = (value) => {
    setRating(value);
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const renderStaticStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (score >= i) {
        stars.push(<span key={i} className="star-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star-empty">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="main-wrapper">
      <Header />

      <main className="review-container">
        <h2 className="page-title">리뷰 작성</h2>

        {/* 1. 상단 통계 박스 (전면 수정) */}
        <section className="box-item stats-section">
          <div className="building-name-column">
             <span className="building-name">안서동 햇살빌라</span>
          </div>

          <div className="avg-rating-column">
            <span className="avg-label">평균 별점</span>
            <span className="avg-value">{rating.toFixed(1)}</span>
            <div className="static-stars">
              {renderStaticStars(rating)}
            </div>
          </div>

          <div className="count-info-column">
            <div className="gray-card">
              <p>리뷰등록: 4건</p>
              <p>포토리뷰: 1건</p>
              <p>조회수: 20</p>
              <p className="more-dots">...</p>
            </div>
          </div>

          <div className="graph-divider"></div>

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

        {/* 2. 별점 및 키워드 작성 박스 */}
        <section className="box-item form-top-row">
          <div className="star-input-group">
            <span className="form-label">어떠셨나요?</span>
            <div className="interactive-star-rating">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="star-wrapper"
                  onMouseMove={() => handleMouseMove(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => handleClick(hover)}
                >
                  <span className={`star-icon ${(hover || rating) > i ? 'active' : ''}`}>★</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="vertical-divider"></div>

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

        {/* 3. 리뷰 본문 박스 */}
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

export default Review;