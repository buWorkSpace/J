import { useState } from "react";
import UserHeader from "../../components/User_header";
import "./adminpage.css";

function AdminPage() {
  const [contracts, setContracts] = useState([
    {
      id: 1,
      name: "장원영",
      userId: "dnff",
      building: "조형 원룸",
      status: "승인",
      rejectReason: "",
      contractFile: "/sample-contract.pdf",
    },
    {
      id: 2,
      name: "박서연",
      userId: "edgt",
      building: "백석 원룸",
      status: "승인",
      rejectReason: "",
      contractFile: "/sample-contract.pdf",
    },
    {
      id: 3,
      name: "김민준",
      userId: "dtdt",
      building: "",
      status: "반려",
      rejectReason: "계약서 정보가 선명하지 않습니다.",
      contractFile: "/sample-contract.pdf",
    },
    {
      id: 4,
      name: "백재이",
      userId: "juju",
      building: "",
      status: "대기중",
      rejectReason: "",
      contractFile: "/sample-contract.pdf",
    },
    {
      id: 5,
      name: "이하나",
      userId: "mbti",
      building: "",
      status: "반려",
      rejectReason: "",
      contractFile: "/sample-contract.pdf",
    },
    {
      id: 6,
      name: "김사랑",
      userId: "sara",
      building: "안서 원룸",
      status: "승인",
      rejectReason: "",
      contractFile: "/sample-contract.pdf",
    },
    {
      id: 7,
      name: "이예은",
      userId: "ytyt",
      building: "",
      status: "대기중",
      rejectReason: "",
      contractFile: "/sample-contract.pdf",
    },
    {
      id: 8,
      name: "김은희",
      userId: "hsdh",
      building: "",
      status: "대기중",
      rejectReason: "",
      contractFile: "/sample-contract.pdf",
    },
    {
      id: 9,
      name: "박송준",
      userId: "iijk",
      building: "",
      status: "반려",
      rejectReason: "",
      contractFile: "/sample-contract.pdf",
    },
  ]);

  const [selectedContract, setSelectedContract] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [reviewStatus, setReviewStatus] = useState("대기중");
  const [rejectReason, setRejectReason] = useState("");
  const [isFileOpen, setIsFileOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  const filteredContracts = contracts.filter((item) => {
    const matchName = item.name.includes(searchText);
    const matchStatus = filterStatus === "전체" || item.status === filterStatus;

    return matchName && matchStatus;
  });

  const openContractModal = (contract) => {
    setSelectedContract(contract);
    setBuildingName(contract.building);
    setReviewStatus(contract.status);
    setRejectReason(contract.rejectReason || "");
  };

  const closeContractModal = () => {
    setSelectedContract(null);
    setIsFileOpen(false);
  };

  const handleStatusClick = (status) => {
    setReviewStatus(status);

    if (status !== "반려") {
      setRejectReason("");
    }
  };

  const handleSave = () => {
    const updatedContracts = contracts.map((item) =>
      item.id === selectedContract.id
        ? {
            ...item,
            building: buildingName,
            status: reviewStatus,
            rejectReason: reviewStatus === "반려" ? rejectReason : "",
          }
        : item,
    );

    setContracts(updatedContracts);
    closeContractModal();
  };

  const getStatusClass = (status) => {
    if (status === "승인") return "approved";
    if (status === "반려") return "rejected";
    return "waiting";
  };

  return (
    <div className="admin-page">
      <UserHeader />

      <section className="admin-title-section">
        <h2>계약서 심사</h2>
        <p>거주지 인증 요청을 검토하고 승인 또는 반려합니다</p>
      </section>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-profile">
            <div className="admin-circle">관</div>
            <strong>관리자</strong>
          </div>

          <p className="side-title">관리</p>
          <ul>
            <li>▤ 계약서 심사</li>
            <li>● 회원 관리</li>
            <li>⚙ 리뷰 관리</li>
          </ul>

          <p className="side-title">통계</p>
          <ul>
            <li>↗ 리뷰 현황</li>
          </ul>
        </aside>

        <main className="admin-content">
          <div className="admin-list-header">
            <h3>
              계약서 목록 <span>{filteredContracts.length}</span>
            </h3>

            <div className="admin-filter">
              <button
                className={filterStatus === "전체" ? "filter-active" : ""}
                onClick={() => setFilterStatus("전체")}
              >
                전체
              </button>

              <button
                className={filterStatus === "대기중" ? "filter-active" : ""}
                onClick={() => setFilterStatus("대기중")}
              >
                대기중
              </button>

              <button
                className={filterStatus === "승인" ? "filter-active" : ""}
                onClick={() => setFilterStatus("승인")}
              >
                승인
              </button>

              <button
                className={filterStatus === "반려" ? "filter-active" : ""}
                onClick={() => setFilterStatus("반려")}
              >
                반려
              </button>

              <div className="admin-search">
                <span className="search-symbol">🔍</span>
                <input
                  placeholder="이름 검색"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <table className="contract-table">
            <thead>
              <tr>
                <th>순서</th>
                <th>사용자 이름</th>
                <th>사용자 ID</th>
                <th>계약서</th>
                <th>건물명</th>
                <th>상태</th>
              </tr>
            </thead>

            <tbody>
              {filteredContracts.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td
                    className="clickable-name"
                    onClick={() => openContractModal(item)}
                  >
                    {item.name}
                  </td>

                  <td>{item.userId}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => openContractModal(item)}
                    >
                      ▤ 보기
                    </button>
                  </td>

                  <td>{item.building || "-"}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(item.status)}`}
                    >
                      ● {item.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredContracts.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-result">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>

      {selectedContract && (
        <div className="modal-bg">
          <div className="contract-modal">
            <button className="modal-close" onClick={closeContractModal}>
              ×
            </button>

            <h2>계약서 심사</h2>

            <div className="modal-form">
              <label>
                사용자 이름
                <input value={selectedContract.name} readOnly />
              </label>

              <label>
                사용자 ID
                <input value={selectedContract.userId} readOnly />
              </label>

              <label>
                계약서
                <button
                  type="button"
                  className="modal-file-btn"
                  onClick={() => setIsFileOpen(true)}
                >
                  🔗계약서 보기
                </button>
              </label>

              <label>
                건물명
                <input
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  placeholder="건물명 입력"
                />
              </label>

              <label>
                상태
                <div className="modal-status-btns">
                  <button
                    type="button"
                    className={
                      reviewStatus === "대기중" ? "active waiting" : ""
                    }
                    onClick={() => handleStatusClick("대기중")}
                  >
                    대기중
                  </button>

                  <button
                    type="button"
                    className={reviewStatus === "승인" ? "active approved" : ""}
                    onClick={() => handleStatusClick("승인")}
                  >
                    승인
                  </button>

                  <button
                    type="button"
                    className={reviewStatus === "반려" ? "active rejected" : ""}
                    onClick={() => handleStatusClick("반려")}
                  >
                    반려
                  </button>
                </div>
              </label>

              <label>
                반려 사유
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="내용을 입력하세요"
                  disabled={reviewStatus !== "반려"}
                  className="reject-textarea"
                />
              </label>
            </div>

            <div className="modal-bottom">
              <button className="confirm-btn" onClick={handleSave}>
                확인
              </button>

              <button className="cancel-btn" onClick={closeContractModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {isFileOpen && selectedContract && (
        <div className="file-modal-bg">
          <div className="file-modal">
            <button
              className="file-modal-close"
              onClick={() => setIsFileOpen(false)}
            >
              ×
            </button>

            <h3>계약서 미리보기</h3>

            <iframe
              src={selectedContract.contractFile}
              title="계약서 미리보기"
              className="contract-preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
