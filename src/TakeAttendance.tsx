import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { IconContext } from 'react-icons' //IconContextをインポート
import { BsFillTriangleFill } from "react-icons/bs";
import db from "./firebase";
import './App.css'

function TakeAttendance() {
  const [ students, setStudents ] = useState<any>([])
  const [ activeIndex, setActiveIndex ] = useState<number | null>(null); // 現在アクティブなボタンのインデックス

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

  // ボタンクリックの処理
  const handleClick = (index: number) => {
    if (activeIndex === index) {
      // すでにアクティブなボタンを押した場合
      console.log(`ボタン ${index + 1} を非アクティブにしました`);
      setActiveIndex(null); // 非アクティブにする
    } else {
      // 非アクティブなボタンを押した場合
      console.log(`ボタン ${index + 1} をアクティブにしました`);
      setActiveIndex(index); // アクティブにする
    }
  };

  return (
    <>
      <div className="TakeAttendance-List">
        <div className="Title-area">
          <h1>出席確認</h1>
        </div>
        <div className="button-area">
          <div className="SubTitle-area">
            <h2>チーム一覧</h2>
          </div>
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
          <div className="SubTitle-area">
            <h2>選手一覧</h2>
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
                        氏名
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
                        フリガナ
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
                        学年
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
                        所属チーム
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
                        出席確認
                      </label>
                    </label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student:any,index:number) => (
                <tr>
                  <td>{student.Name}</td>   {/* データベースから氏名を取得 */}
                  <td>{student.Kana}</td>   {/* データベースからフリガナを取得 */}
                  <td>{student.Grade}</td>  {/* データベースから学年を取得 */}
                  <td>{student.Team}</td>   {/* データベースからチーム名を取得 */}
                  <td>
                    <button 
                      key={index}
                      className={`changebtn ${activeIndex === index ? "active" : ""}`} 
                      onClick={() => handleClick(index)} // クリックしたボタンだけアクティブにする
                    >
                      {activeIndex === index ? "－ 欠席へ変更" : "＋ 出席へ変更" }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TakeAttendance;