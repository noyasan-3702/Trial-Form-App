import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";
import './App.css'

function AttendanceList() {
  const [ Attendances, setAttendances ] = useState<any>([])

  // 初回読み込み
  useEffect(() => {
    // 体験者情報データベースにアクセス
    const AttendanceData = collection(db, "生徒一覧")

    // データを取得できたら、配列内にデータを格納
    getDocs(AttendanceData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })))
      setAttendances(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  // 当日の日付を取得
  const today = new Date();
  const formatDate = today.toLocaleDateString('ja-JP', { 
      year: 'numeric',    // 年 (例: 2024)
      month: '2-digit',   // 月 (例: 01)
      day: '2-digit'      // 日 (例: 01)
  });

  return (
    <>
      <div className="Attendance-List">
        <div className="Title-area">
          <h1>出席データ詳細</h1>
        </div>
        <div className="overview">
          <div className="List-area">
            <div className="Title-area">
              <h2>概要</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <th>日付</th>
                  <th>出席人数</th>
                  <th>合計人数</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDate}</td>     {/* 当日の日付を入力 */}
                  <td></td>                 {/* データベースから出席人数を取得 */}
                  <td></td>                 {/* データベースから合計人数を取得 */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="Attendee-list">
          <div className="List-area">
            <div className="Title-area">
              <h2>出席者一覧</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <th>氏名</th>
                  <th>フリガナ</th>
                  <th>学年</th>
                  <th>所属チーム</th>
                </tr>
              </thead>
              <tbody>
                {Attendances.map((Attendance:any) => (
                  <tr>
                    <td>{Attendance.Name}</td>   {/* データベースから氏名を取得 */}
                    <td>{Attendance.Kana}</td>   {/* データベースからフリガナを取得 */}
                    <td>{Attendance.Grade}</td>  {/* データベースから学年を取得 */}
                    <td>{Attendance.Team}</td>   {/* データベースからチーム名を取得 */}
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

export default AttendanceList;