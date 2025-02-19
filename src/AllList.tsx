import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { IconContext } from 'react-icons' //IconContextをインポート
import { BsFillTriangleFill } from "react-icons/bs";
import db from "./firebase";
import './App.css'

function AllList() {
  const [ students, setStudents ] = useState<any>([]);
  const [ isaddPopupVisible, setIsaddPopupVisible ] = useState(false);        // 新規追加ポップアップの表示・非表示を管理
  const [ iseditPopupVisible, setIseditPopupVisible ] = useState(false);      // 編集ポップアップの表示・非表示を管理
  const [ isdeletePopupVisible, setIsdeletePopupVisible ] = useState(false);  // 削除ポップアップの表示・非表示を管理
  const [ teams, setTeams ] = useState<any>([]);
  const [ value, setValue ] = useState("");     
  const [ editStudent, setEditStudent ] = useState([]);                         // 編集したい値を管理
                               
  // 初回読み込み
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Firestore から "生徒一覧" コレクションのデータを取得
        const studentData = collection(db, "生徒一覧");
        const Snapshot = await getDocs(studentData);

        // 生徒データを取得して State にセット
        const studentList = Snapshot.docs.map(doc => ({ ...doc.data() }));
        setStudents(studentList);

        // "Team" の値を抽出し、重複を削除
        const DBTeams = studentList.map(student => student.Team); // "Team" の値を全て取得
        const uniqueTeams = [...new Set(DBTeams)]; // Set を使って重複を削除
        setTeams(uniqueTeams);
        
        // こんそーるする
        console.log("取得した生徒一覧:", studentList);
        console.log("取得したチーム一覧:", uniqueTeams);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    };

    fetchData(); // 関数を実行
  }, []);

  // 編集ポップアップを開く
  const EditOpenPopup = (student: any) => {
    setEditStudent(student)
    setIseditPopupVisible(true);
    console.log("編集する生徒の情報:", student);
    console.log("編集する生徒の名前:", editStudent);
  };

  // 編集ポップアップを閉じる
  const EditClosePopup = () => {
    setIseditPopupVisible(false);
  };

  //編集内容を保存する
  const EditSave = () => {

    setIseditPopupVisible(false);
  }


  // 新規追加ポップアップを開く
  const AddOpenPopup = () => {
    setIsaddPopupVisible(true);
  };

  // 新規追加ポップアップを閉じる
  const AddClosePopup = () => {
    setIsaddPopupVisible(false);
  };

  //新規追加した生徒の情報を保存する
  const AddSave = () => {

    setIsaddPopupVisible(false);
  }


  // 削除ポップアップを開く
  const DeleteOpenPopup = (student: any) => {

    setIsdeletePopupVisible(true);
  };

  // 削除ポップアップを閉じる
  const DeleteClosePopup = () => {
    setIsdeletePopupVisible(false);
  };

  //生徒の情報を削除する
  const DeleteExecution = () => {
    
    setIsdeletePopupVisible(false);
  }

  return (
    <>
      <div className="AllList">
        <div className="Popup-area">
          {/* 新規追加Popup */}
          {isaddPopupVisible && (
            <div className="Popup-overlay">
              <div className="Add-popup">
                <div className="Popup-header">
                  <button className="PopupClosebtn" onClick={AddClosePopup}>✕</button>
                  <h4 className="Header-title">メンバーの新規追加</h4>
                </div>
                <div className="Popup-body">
                  <div className="Body-element">
                    <h4 className="SubTitle">氏名</h4>
                    <input type="text" className="inputer1" />
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">フリガナ</h4>
                    <input type="text" className="inputer1" />
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">学年</h4>
                    <input type="number" value="4" min="1" max="6" className="inputer2" />
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">チーム</h4>
                    <input list="teams" value={value} 
                      onChange={(e) => setValue(e.target.value)} 
                      placeholder="選択または入力" className="inputer1" 
                    />
                    <datalist id="teams">
                      {teams.map((team: string, index: number) => (
                        <option key={index} value={team} />
                      ))}
                    </datalist>
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">連絡先</h4>
                    <input type="tel" className="inputer1" />
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">メールアドレス</h4>
                    <input type="email" className="inputer1" />
                  </div>
                  <div className="Popup-button">
                    <button className="addbtn" onClick={AddSave}>新規追加する</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 編集Popup */}
            {iseditPopupVisible && (
            <div className="Popup-overlay">
              <div className="Edit-popup">
                <div className="Popup-header">
                  <button className="PopupClosebtn" onClick={EditClosePopup}>✕</button>
                  <h4 className="Header-title">メンバー情報の編集</h4>
                </div>
                <div className="Popup-body">
                  <div className="Body-element">
                    <h4 className="SubTitle">ID</h4>
                    <div></div>
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">氏名</h4>
                    <input type="text" className="inputer1" />
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">フリガナ</h4>
                    <input type="text" className="inputer1" />
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">学年</h4>
                    <input type="number" min="1" max="6" className="inputer2" />
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">チーム</h4>
                    <input list="teams" value={value} 
                      onChange={(e) => setValue(e.target.value)} 
                      placeholder="選択または入力" className="inputer1" 
                    />
                    <datalist id="teams">
                      {teams.map((team: string, index: number) => (
                        <option key={index} value={team} />
                      ))}
                    </datalist>
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">連絡先</h4>
                    <input type="tel" className="inputer1" />
                  </div>
                  <div className="Body-element">
                    <h4 className="SubTitle">メールアドレス</h4>
                    <input type="email" className="inputer1" />
                  </div>
                  <div className="Popup-button">
                    <button className="editbtn" onClick={EditSave}>編集内容を確定する</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 削除Popup */}
          {isdeletePopupVisible && (
            <div className="Popup-overlay">
              <div className="Delete-popup">
                <div className="Popup-body">
                  <h4 className="DeleteName">{`~~~を削除します。\nよろしいですか。`}</h4>
                  <div className="Popup-button">
                    <button onClick={DeleteExecution}>はい</button>
                    <button onClick={DeleteClosePopup}>キャンセル</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="Title-area">
          <h1>生徒一覧</h1>
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
                        編集
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
                        削除
                      </label>
                    </label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: any) => (
                <tr key={student.id}>
                  <td>{student.Name}</td>   {/* データベースから氏名を取得 */}
                  <td>{student.Kana}</td>   {/* データベースからフリガナを取得 */}
                  <td>{student.Grade}</td>  {/* データベースから学年を取得 */}
                  <td>{student.Team}</td>   {/* データベースからチーム名を取得 */}
                  <td><button className="editbtn" onClick={() => EditOpenPopup(student)}>編集</button></td>
                  <td><button className="deletebtn" onClick={() => DeleteOpenPopup(student)}>削除</button></td>
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