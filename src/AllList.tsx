import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";
import './App.css'

function AllList() {
  const [ students, setStudents ] = useState<any>([])

  // 初回読み込み
  useEffect(() => {
    // 体験者情報データベースにアクセス
    const studentData = collection(db, "生徒一覧")

    // データを取得できたら、配列内にデータを格納
    getDocs(studentData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })))
      setStudents(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  return (
    <>
      <div className="AllList">
        <div className="Title-area">
          <h1>生徒一覧</h1>
        </div>
        <div className="button-area">
          <div className="team-label">
            <label>
              {/* 登録されているチーム名をデータベースから全て取得 */}
            </label>
            <label>
              {/* 所属チームの合計人数を取得 */}
            </label>
          </div>
        </div>
        <div className="List-area">
          <table>
            <thead>
              <tr>
                <th>氏名</th>
                <th>フリガナ</th>
                <th>学年</th>
                <th>所属チーム</th>
                <th>編集</th>
                <th>削除</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student:any) => (
                <tr>
                  <td>{student.Name}</td>   {/* データベースから氏名を取得 */}
                  <td>{student.Kana}</td>   {/* データベースからフリガナを取得 */}
                  <td>{student.Grade}</td>  {/* データベースから学年を取得 */}
                  <td>{student.Team}</td>   {/* データベースからチーム名を取得 */}
                  <td><button className="editbtn">編集</button></td>
                  <td><button className="deletebtn">削除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllList;