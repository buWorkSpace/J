import React, { useState, useRef } from 'react';
import './mypage.css';

const user = {
  name: '김홈즈',
  email: 'Tellmehomes@example.com',
  reviewCount: 2,
  avgScore: 4.5,
  birth: '2026.02.06',
  phone: '010-1234-5678',
  joinDate: '2025.02.06',
};

const reviews = [
  {
    id: 1,
    place: '안서하이츠 원룸',
    addr: '충남 천안시 동남구 안서동 123-45',
    score: 4,
    keywords: ['햇빛 좋음', '소음 있음', '가성비'],
    text: '햇빛이 잘 들고 학교랑 가까워서 통학이 편해요. 다만 주말 밤에 소음이 좀 있는 편이고, 수도 압력이 약간 낮습니다. 전체적으로 가성비는 괜찮았어요.',
    approved: false,
  },
  {
    id: 2,
    place: '안서타운 투룸 (리모델링)',
    addr: '충남 천안시 동남구 안서동 123-45',
    score: 4,
    keywords: ['햇빛 좋음', '소음 없음', '가성비'],
    text: '최근에 리모델링해서 내부가 깔끔합니다. 빌트인 세탁기가 있어서 편리하고, 집주인도 빠르게 연락이 돼서 좋았어요.',
    approved: true,
  },
  {
    id: 3,
    place: '백석빌라 고시원',
    addr: '충남 천안시 동남구 안서동 123-45',
    score: 4,
    keywords: ['햇빛 좋음', '소음 없음', '가성비'],
    text: '햇빛이 잘 들어와서 낮에는 밝고 쾌적해요. 주변 편의시설이 많아서 생활하기 편리했어요.',
    approved: false,
  },
];

function Stars({ score, total = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: total }, (_, i) =>
        i < score
          ? <span key={i} className="star-filled">★</span>
          : <span key={i} className="star-empty">★</span>
      )}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      {review.approved && <div className="stamp">승인</div>}
      <div className="review-top">
        <span className="review-place">{review.place}</span>
        <span className="review-addr">{review.addr}</span>
      </div>
      <div className="review-meta">
        <Stars score={review.score} />
        <span className="meta-label">키워드</span>
        <div className="keywords">
          {review.keywords.map((kw) => (
            <span key={kw} className="kw-tag">{kw}</span>
          ))}
        </div>
      </div>
      <div className="review-text">{review.text}</div>
      <div className="review-actions">
        <span className="act-link">수정</span>
        <span className="act-dot">|</span>
        <span className="act-link">삭제</span>
      </div>
    </div>
  );
}

export default function MyPage() {
  // 1. 인증 상태 관리용 상태값 (테스트를 위해 초기값을 '미등록'으로 설정)
  const [userStatus, setUserStatus] = useState('미등록');
  const fileInputRef = useRef(null);

  // 2. 파일 업로드 버튼 핸들러
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`${file.name} 업로드 완료!`);
      setUserStatus('미승인'); // 업로드 시 '미승인(심사중)'으로 상태 변경 예시
    }
  };

  return (
    <div className="page-wrap">
      <aside className="sidebar">
        <div className="profile-area">
          <div className="avatar">{user.name[0]}</div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
          <div className="profile-stats">
            <div>
              <div className="stat-num">{user.reviewCount}</div>
              <div className="stat-label">작성리뷰</div>
            </div>
            <div>
              <div className="stat-num">{user.avgScore}</div>
              <div className="stat-label">평균 점수</div>
            </div>
          </div>
        </div>
        <nav className="nav">
          <div className="nav-group-title">계정</div>
          <a className="nav-item">개인정보</a>
          <a className="nav-item active">내가 작성한 리뷰</a>
          <a className="nav-item">관심목록</a>
          <div className="nav-group-title">인증</div>
          <a className="nav-item">거주지 인증</a>
          <div className="nav-group-title">기타</div>
          <a className="nav-item">알림 설정</a>
          <div className="nav-logout">로그아웃</div>
        </nav>
      </aside>

      <main className="main">
        <div className="page-title">마이페이지</div>
        <div className="top-row">
          <div className="info-card">
            <div className="card-header">
              <span className="card-title">개인정보</span>
              <button className="edit-btn">수정</button>
            </div>
            <div className="info-table">
              <div className="info-row">
                <span className="info-label">이름</span>
                <span className="info-val">{user.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">생년월일</span>
                <span className="info-val">{user.birth}</span>
              </div>
              <div className="info-row">
                <span className="info-label">전화번호</span>
                <span className="info-val">{user.phone}</span>
              </div>
              <div className="info-row">
                <span className="info-label">이메일</span>
                <span className="info-val">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">가입일</span>
                <span className="info-val">{user.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="cert-card">
            <div className="cert-top">
              <span className="card-title">거주지 인증</span>
              <div className="cert-tabs">
                <span className={`cert-tab ${userStatus === '반려' ? 'active' : ''}`}>반려</span>
                <span className={`cert-tab ${userStatus === '승인' ? 'active' : ''}`}>승인</span>
                <span className={`cert-tab ${userStatus === '미승인' ? 'active' : ''}`}>미승인</span>
                <span className={`cert-tab ${userStatus === '미등록' ? 'active' : ''}`}>미등록</span>
              </div>
            </div>
            <div className="cert-address-row">
              <span className="pin-icon">📍</span>
              <div className="cert-addr">
                {userStatus === '미등록' 
                  ? '거주지 정보가 등록되지 않았습니다.' 
                  : <>충청남도 천안시 동남구 백석대학로 1<br />202호· 원룸</>}
              </div>
            </div>
            <div className="cert-status-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="cert-status-label">인증상태</span>
                <span className="status-badge">
                  {userStatus === '승인' ? '✔ 승인' : `● ${userStatus}`}
                </span>
              </div>

              {/* 💡 핵심: 미등록 또는 반려 상태일 때만 재업로드 버튼 노출 */}
              {(userStatus === '미등록' || userStatus === '반려') && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <button className="edit-btn" onClick={handleUploadClick}>
                    재업로드 하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="section-header">
          <span className="section-title">내가 작성한 리뷰</span>
          <button className="write-btn">+ 리뷰 쓰기</button>
        </div>

        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </main>
    </div>
  );
}