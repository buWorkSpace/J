import { useState } from 'react';
import './Home.css';

function Home() {
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
  const [favorites, setFavorites] = useState([]);

  // 하트 클릭 핸들러
  const toggleFavorite = (e, id) => {
    e.preventDefault(); 
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // 검색 및 정렬 로직
  let filteredBuildings = buildingList.filter((b) => b.name.includes(searchKeyword));

  if (sortType === '리뷰순') {
    filteredBuildings.sort((a, b) => b.reviewCount - a.reviewCount);
  } else if (sortType === '별점순') {
    filteredBuildings.sort((a, b) => b.rating - a.rating);
  } else if (sortType === '관심목록순') {
    filteredBuildings = filteredBuildings.filter(b => favorites.includes(b.id));
  }

  const totalPages = Math.ceil(filteredBuildings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBuildings.slice(indexOfFirstItem, indexOfLastItem);
  const emptySlots = Array.from({ length: Math.max(0, itemsPerPage - currentItems.length) });

  const handleSearch = () => {
    setSearchKeyword(inputValue);
    setCurrentPage(1);
  };

  return (
    <main className="home">
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
          <select 
            className="sort_select" 
            value={sortType} 
            onChange={(e) => {
              setSortType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="기본순">기본순</option>
            <option value="리뷰순">리뷰순</option>
            <option value="별점순">별점순</option>
            <option value="관심목록순">관심목록순</option>
          </select>
        </div>
      </section>

      <section className="home_building_outer_box">
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
                  
                  {/* 하트 버튼 교체: 세련된 SVG 하트 모양 */}
                  <button 
                    className={`heart_btn ${favorites.includes(building.id) ? 'active' : ''}`} 
                    onClick={(e) => toggleFavorite(e, building.id)}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill={favorites.includes(building.id) ? "#e74c3c" : "none"} 
                      stroke={favorites.includes(building.id) ? "#e74c3c" : "white"} 
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
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
          
          {emptySlots.map((_, index) => (
            <div key={`empty-${index}`} className="building_card_empty" />
          ))}
        </div>

        <button 
          className="slide_btn next_btn" 
          onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >〉</button>

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