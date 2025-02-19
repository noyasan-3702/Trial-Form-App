import { useNavigate } from "react-router-dom";
import { IconContext } from 'react-icons' //IconContextをインポート
import { BsFillTriangleFill } from "react-icons/bs";
import './App.css'

function Dashboard() {

  // 擬似配列(当日データ)
  const DayData= [
    { People: '30', Amount: '30000' },
    // 他のデータも同様にデータベースから全て追加
  ];

  // 擬似配列(過去データ)
  const PastData= [
    { Pastday: '2025/02/01', People: '30', Amount: '30000' },
    { Pastday: '2025/02/08', People: '20', Amount: '20000' },
    { Pastday: '2025/02/10', People: '15', Amount: '15000' },
    // 他のデータも同様にデータベースから全て追加
  ];

  // 当日の日付を取得
  const today = new Date();
  const formatDate = today.toLocaleDateString('ja-JP', { 
      year: 'numeric',    // 年 (例: 2024)
      month: '2-digit',   // 月 (例: 01)
      day: '2-digit'      // 日 (例: 01)
  });

  // 詳細ページ遷移処理
  const navigate = useNavigate();
  const AttendanceListGo = () => {
    navigate("/AttendanceList");
  };

    return (
      <>
      <div className="Dashboard-List">
        <div className="Title-area">
          <h1>ダッシュボード</h1>
        </div>
        <div className="TodayData-area">
          <div className="List-area"> 
            <div className="SubTitle-area">
              <h2>当日データ</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <th>
                    <div className="table-link-box">
                      <label className="table-link-icon">
                        <IconContext.Provider value={{ size: '10px' , style:{ color: '#ffffff' , transform: "rotate(180deg)" }}}>
                          <BsFillTriangleFill />
                        </IconContext.Provider>
                        <label className="table-link-text">
                          日付
                        </label>
                      </label>
                    </div>
                  </th>
                  <th>
                    <div className="table-link-box">
                      <label className="table-link-icon">
                        <IconContext.Provider value={{ size: '10px' , style:{ color: '#ffffff' , transform: "rotate(180deg)" }}}>
                          <BsFillTriangleFill />
                        </IconContext.Provider>
                        <label className="table-link-text">
                          出席人数
                        </label>
                      </label>
                    </div>
                  </th>
                  <th>
                    <div className="table-link-box">
                      <label className="table-link-icon">
                        <IconContext.Provider value={{ size: '10px' , style:{ color: '#ffffff' , transform: "rotate(180deg)" }}}>
                          <BsFillTriangleFill />
                        </IconContext.Provider>
                        <label className="table-link-text">
                          合計人数
                        </label>
                      </label>
                    </div>
                  </th>
                  <th>
                    <div className="table-link-box">
                      <label className="table-link-icon">
                        <IconContext.Provider value={{ size: '10px' , style:{ color: '#ffffff' , transform: "rotate(180deg)" }}}>
                          <BsFillTriangleFill />
                        </IconContext.Provider>
                        <label className="table-link-text">
                            詳細
                        </label>
                      </label>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {DayData.map((daydata, index) => (
                  <tr key={index}>
                  <td>{formatDate}</td>       {/* 関数から当日の日付を取得 */}
                  <td>{daydata.People}</td>   {/* データベースからフリガナを取得 */}
                  <td>{daydata.Amount}</td>   {/* データベースから学年を取得 */}
                  <td><button className="detailbtn" onClick={AttendanceListGo}>データ詳細</button></td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="PastData-area">
            <div className="List-area">
              <div className="SubTitle-area">
                <h2>過去データ</h2>
              </div> 
            <table>
              <thead>
                <tr>
                <th>
                    <div className="table-link-box">
                      <label className="table-link-icon">
                        <IconContext.Provider value={{ size: '10px' , style:{ color: '#ffffff' , transform: "rotate(180deg)" }}}>
                          <BsFillTriangleFill />
                        </IconContext.Provider>
                        <label className="table-link-text">
                          日付
                        </label>
                      </label>
                    </div>
                  </th>
                  <th>
                    <div className="table-link-box">
                      <label className="table-link-icon">
                        <IconContext.Provider value={{ size: '10px' , style:{ color: '#ffffff' , transform: "rotate(180deg)" }}}>
                          <BsFillTriangleFill />
                        </IconContext.Provider>
                        <label className="table-link-text">
                          出席人数
                        </label>
                      </label>
                    </div>
                  </th>
                  <th>
                    <div className="table-link-box">
                      <label className="table-link-icon">
                        <IconContext.Provider value={{ size: '10px' , style:{ color: '#ffffff' , transform: "rotate(180deg)" }}}>
                          <BsFillTriangleFill />
                        </IconContext.Provider>
                        <label className="table-link-text">
                          合計人数
                        </label>
                      </label>
                    </div>
                  </th>
                  <th>
                    <div className="table-link-box">
                      <label className="table-link-icon">
                        <IconContext.Provider value={{ size: '10px' , style:{ color: '#ffffff' , transform: "rotate(180deg)" }}}>
                          <BsFillTriangleFill />
                        </IconContext.Provider>
                        <label className="table-link-text">
                            詳細
                        </label>
                      </label>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PastData.map((pastdata, index) => (
                <tr key={index}>
                  <td>{pastdata.Pastday}</td>   {/* データベースから過去の日付を取得 */}
                  <td>{pastdata.People}</td>    {/* データベースからフリガナを取得 */}
                  <td>{pastdata.Amount}</td>    {/* データベースから学年を取得 */}
                  <td><button className="detailbtn" onClick={AttendanceListGo}>データ詳細</button></td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default Dashboard;