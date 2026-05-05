import { useState } from 'react';
import './Home.css';

function Home() {
  // 샘플 데이터 (컴공 과제나 프로젝트 시 활용할 수 있는 예시 데이터입니다)
  const buildingList = [
    { id: 1, name: '해솔타운', rating: 4.5, reviewCount: 10, image: '/building1.jpg' },
    { id: 2, name: '청담빌라', rating: 3.5, reviewCount: 12, image: '/building2.jpg' },
    { id: 3, name: '그린타운', rating: 4.0, reviewCount: 8, image: '/building3.jpg' },
    { id: 4, name: '금강빌라', rating: 4.9, reviewCount: 5, image: '/building4.jpg' },
    { id: 5, name: '리버타운', rating: 4.9, reviewCount: 1, image: '/building5.jpg' },
    { id: 6, name: '한빛빌라', rating: 4.6, reviewCount: 2, image: '/building6.jpg' },
    { id: 7, name: '백석빌라', rating: 4.2, reviewCount: 7, image: '/building1.jpg' },
  ];

  const [inputValue, setInputValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortType, setSortType] = useState('기본순');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 검색 및 정렬 로직
  let filteredBuildings = buildingList.filter((b) => b.name.includes(searchKeyword));
  if (sortType === '리뷰순') filteredBuildings.sort((a, b) => b.reviewCount - a.reviewCount);
  else if (sortType === '별점순') filteredBuildings.sort((a, b) => b.rating - a.rating);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredBuildings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // 현재 페이지 아이템 (최대 6개)
  const currentItems = filteredBuildings.slice(indexOfFirstItem, indexOfLastItem);
  
  // 6개 공간 고정을 위한 빈 슬롯 계산
  const emptySlots = Array.from({ length: Math.max(0, itemsPerPage - currentItems.length) });

  const handleSearch = () => {
    setSearchKeyword(inputValue);
    setCurrentPage(1);
  };

  return (
    <main className="home">
      {/* 상단 검색 및 정렬 박스 */}
      <section className="home_top_section">
        <div className="home_search_bar">
          <span className="search_icon">🔍</span>
          <input
            type="text"
            className="home_search_input"
            placeholder="동, 단지명, 매물번호를 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <div className="sort_container">
          <span className="sort_label">정렬</span>
          <select className="sort_select" value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="기본순">기본순</option>
            <option value="리뷰순">리뷰순</option>
            <option value="별점순">별점순</option>
          </select>
        </div>
      </section>

      {/* 메인 리스트 영역 */}
      <section className="home_building_outer_box">
        {/* 슬라이드 버튼 (항상 표시) */}
        <button 
          className="slide_btn prev_btn" 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >〈</button>

        <div className="home_building_grid">
          {currentItems.map((building) => (
            <a href={`/detail?id=${building.id}`} key={building.id} className="building_card_link">
              <div className="building_card">
                <div className="image_wrapper">
                  <img src={building.image} alt={building.name} className="building_card_image" />
                  <button className="heart_btn" onClick={(e) => e.preventDefault()}>♡</button>
                </div>
                <div className="building_card_info">
                  <span className="building_card_name">{building.name}</span>
                  <span className="building_card_rating">
                    <span className="star_icon">★</span> {building.rating} ({building.reviewCount})
                  </span>
                </div>
              </div>
            </a>
          ))}
          
          {/* 사진이 6개 미만일 때 빈 공간을 채워주는 박스 */}
          {emptySlots.map((_, index) => (
            <div key={`empty-${index}`} className="building_card_empty" />
          ))}
        </div>

        <button 
          className="slide_btn next_btn" 
          onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >〉</button>

        {/* 하단 숫자 페이지네이션 */}
        <div className="pagination">
          {Array.from({ length: totalPages || 1 }).map((_, i) => (
            <span 
              key={i} 
              className={`page_num ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;