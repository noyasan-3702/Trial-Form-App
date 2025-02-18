import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";
import './App.css'

function ExperiencerList() {
  const [ posts, setPosts ] = useState<any>([])

  // 初回読み込み
  useEffect(() => {
    // 体験者情報データベースにアクセス
    const postData = collection(db, "体験者情報")

    // データを取得できたら、配列内にデータを格納
    getDocs(postData).then((snapShot) => {
      console.log(snapShot.docs.map((doc) => ({ ...doc.data() })))
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);
  
    return (
      <>
        <div className="ExperiencerList">
          <div className="Title-area">
            <h1>体験者一覧</h1>
          </div>
          <div className="List-area">
            <table>
              <thead>
                <tr>
                  <th>体験日</th>  
                  <th>氏名</th>
                  <th>フリガナ</th>
                  <th>学年</th>
                  <th>所属チーム</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post:any) => (
                  <tr>
                    <td>{post.Experience}</td>  {/* データベースから体験日を取得 */}
                    <td>{post.Name}</td>        {/* データベースから氏名を取得 */}
                    <td>{post.Kana}</td>        {/* データベースからフリガナを取得 */}
                    <td>{post.Grade}</td>       {/* データベースから学年を取得 */}
                    <td>{post.Team}</td>        {/* データベースからチーム名を取得 */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  
  export default ExperiencerList;