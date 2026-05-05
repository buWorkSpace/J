import { useEffect } from "react";
import "./Detail.css";

function Detail() {
  const params = new URLSearchParams(window.location.search);
  const buildingId = params.get("id");

  useEffect(() => {
    console.log("선택된 건물 ID:", buildingId);

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 SDK가 로드되지 않았습니다.");
      return;
    }

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");

      if (!container) {
        console.error("지도 영역을 찾을 수 없습니다.");
        return;
      }

      const position = new window.kakao.maps.LatLng(36.8401, 127.1837);

      const map = new window.kakao.maps.Map(container, {
        center: position,
        level: 3,
      });

      new window.kakao.maps.Marker({
        position,
        map,
      });

      setTimeout(() => {
        map.relayout();
        map.setCenter(position);
      }, 100);
    });
  }, [buildingId]);

  return (
    <main className="detail_container">
      <section className="detail_left">
        <div className="location_section">
          <h3 className="section_title">위치정보</h3>

          <div className="map_search_bar">
            <input
              type="text"
              placeholder="동네, 학교 검색"
              className="map_input"
            />
            <button className="map_search_btn">🔍</button>
          </div>

          <div id="map" className="map_area"></div>
        </div>

        <div className="review_section">
          <div className="review_header">
            <h3 className="section_title">리뷰</h3>
            <button className="review_write_btn">리뷰 작성</button>
          </div>

          <div className="review_list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="review_item_box">
                <div className="review_card_top">
                  <strong>거주후기</strong>
                  <span className="rating_star">별점 ⭐⭐⭐⭐ 4.0</span>
                </div>
                <p className="review_meta">월세 · 2025년 거주민</p>
                <p className="review_content">
                  햇빛이 잘 들고 학교랑 가까워서 통학이 편해요. 전체적으로
                  가성비는 괜찮았어요. 내부 시설도 깔끔하게 유지되고 있어서
                  만족스럽습니다.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail_right">
        <div className="info_box">
          <div className="main_image_wrap">
            <img
              src="/room1.png"
              alt="메인 방 사진"
              className="main_room_img"
            />
          </div>

          <div className="building_info_text">
            <h2 className="detail_building_name">안서동 햇살빌라 302호 원룸</h2>
            <p className="upload_date">최초 등록일 2026.04.05</p>
            <div className="detail_rating_summary">
              별점 ⭐⭐⭐⭐⭐ 4.0 · 리뷰 5개
            </div>
          </div>

          <div className="sub_images_section">
            <h3 className="sub_title">상세 이미지</h3>
            <div className="sub_images_grid">
              <img src="/room2.png" alt="상세 사진 1" />
              <img src="/room3.png" alt="상세 사진 2" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Detail;