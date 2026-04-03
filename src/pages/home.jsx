import { useState } from 'react'
import './home.css'

function Home() {
  // 건물 데이터 (더미 데이터)
  const buildingList = [
    {
      id: 1,
      name: '해솔타운',
      rating: 4.5,
      reviewCount: 10,
      image: '/building1.jpg',
    },
    {
      id: 2,
      name: '청담빌라',
      rating: 3.5,
      reviewCount: 12,
      image: '/building2.jpg',
    },
    {
      id: 3,
      name: '그린타운',
      rating: 4.0,
      reviewCount: 8,
      image: '/building3.jpg',
    },
    {
      id: 4,
      name: '금강빌라',
      rating: 4.9,
      reviewCount: 5,
      image: '/building4.jpg',
    },
    {
      id: 5,
      name: '리버타운',
      rating: 4.9,
      reviewCount: 1,
      image: '/building5.jpg',
    },
    {
      id: 6,
      name: '한빛빌라',
      rating: 4.6,
      reviewCount: 2,
      image: '/building6.jpg',
    },
  ]


  // 검색 관련 상태 (공백제거해주고, 엔터인지 검색버튼을 누른건지)
  const [inputValue, setInputValue] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = () => {
    setSearchKeyword(inputValue.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const filteredBuildings = buildingList.filter((building) =>
    building.name.includes(searchKeyword)
  )





  return (
    <main className="home">
      {/* 건물 검색창 */}
      <section className="home_search_section">
        <div className="home_search_bar">
          <input
            type="text"
            className="home_search_input"
            placeholder="건물명을 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="home_search_button" onClick={handleSearch}>
            🔍
          </button>
        </div>
        {/*나중에 최신순 혹은 별점순 추가해도 괜찮을듯 */}
      </section>

      {/* 건물 리스트 */}
      <section className="home_building_section">
        <div className="home_building_grid">
          {filteredBuildings.length > 0 ? (
            filteredBuildings.map((building) => (
              <div className="building_card" key={building.id}>
                <img
                  src={building.image}
                  alt={building.name}
                  className="building_card_image"
                />

                {/* 각 건물 정보*/}
                <div className="building_card_info">
                  <span className="building_card_name">{building.name}</span>
                  <span className="building_card_rating">
                    ⭐ {building.rating} ({building.reviewCount})
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="no_result">검색 결과가 없습니다.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home