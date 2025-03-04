import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "./firebase";
import './App.css'

interface Student {
  id: string;
  Name: string;
  Kana: string;
  Grade: number;
  Team: string;
  Phone: string;
  Mail: string;
}

interface Experiencer {
  id: string;
  Name: string;
  Kana: string;
  Grade: number;
  Team: string;
  Experience: string;
}

function App() {
  const [ experiencers, setExperiencers ] = useState<any>([])                       // 体験者情報DBから取得した全ての生徒の情報を管理
  const [ teams, setTeams ] = useState<any>([]);                                    // 生徒一覧DB内のチーム名を管理
  const [, setTeamName ] = useState("");                                            // 表示したいチーム名を管理
  const [ addExperiencer, setAddExperiencer ] = useState<Experiencer | null>(null); // 追加したい生徒の情報を管理する

  /** 初回レンタリングの処理
  */
  useEffect(() => {
    const fetchData = async () => {
      try {

        // 体験者情報データベースにアクセス
        const experiencersData = collection(db, "体験者情報")

        // データを取得できたら、配列内にデータを格納
        getDocs(experiencersData).then((snapShot) => {
          console.log(snapShot.docs.map((doc) => ({ ...doc.data() })))
          setExperiencers(snapShot.docs.map((doc) => ({ ...doc.data() })));
        });

        // Firestore から "生徒一覧" コレクションのデータを取得
        const studentCollection = collection(db, "生徒一覧");
        const studentSnapshot = await getDocs(studentCollection);

        // Firestore のデータを取得し、id を含めたオブジェクトを作成
        const studentList: Student[] = studentSnapshot.docs.map(doc => {
          const data = doc.data() as Omit<Student, "id">; // Student 型から id を除いた型にする
          return { id: doc.id, ...data };                 // ドキュメントID を含めた Firestore に保存されている生徒データ
        });

        // "Team" の値を抽出し、重複を削除してデータを state にセット
        const teamList = [...new Set(studentList.map(student => student.Team))];
        setTeams(teamList);

        // デバッグ用のログ出力
        console.log("取得したチーム一覧:", teamList);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    };

    fetchData();  // 関数を実行
  }, []);


  // 入力された内容をリアルタイムで更新
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (addExperiencer) {
      const { name, value } = e.target;
      setAddExperiencer({...addExperiencer, [name]: value});
    }
  };

  //申込した生徒の情報を保存する
  const HandleSave = async () => {
    if (!addExperiencer) return;
    try {

      // 情報を追加したいデータベースを指定
      const experiencersDocRef = collection(db, "体験者情報")
        
      // 申込した生徒の情報を取得
      const experiencerData = {
        Name: addExperiencer.Name,
        Kana: addExperiencer.Kana,
        Grade: Number(addExperiencer.Grade),
        Team: addExperiencer.Team,
        Experience: addExperiencer.Experience,
      };

      // 生徒一覧データベースに生徒の情報を新規追加する
      await addDoc( experiencersDocRef, experiencerData );

      // **Experiencers の状態を更新して再レンダリング**
      setExperiencers((prevExperiencers: any) => 
        prevExperiencers.map((Experiencer: { id: string; }) =>
          Experiencer.id === addExperiencer.id ? { ...Experiencer, ...experiencerData } : Experiencer
        )
      );

    } catch (error) {

      // 新規追加が失敗したとき
      console.error("申込者の情報の追加に失敗しました:", error);
      alert("申込者の情報の追加に失敗しました");

    }
  }

  return (
    <>
      <div className="Trial-form">
        <div className="Trial-form-backimage">
          <img className="img1" src="../ボール.svg" alt="背景画像1" />
          <img className="img2" src="../ボールをける人.svg" alt="背景画像2" />
        </div>
        <div className="form">
          <div className="form-area">
            <div className="form-title">
              体験申し込みフォーム
            </div>
            <div className="form-input">
              <div className="input-title">
                名前
              </div>
              <input name="Name" type="textarea" className="input-area" 
                value={addExperiencer?.Name} onChange={HandleChange}
              />
            </div>
            <div className="form-input">
              <div className="input-title">
                フリガナ
              </div>
              <input name="Kana" type="textarea" className="input-area" 
                value={addExperiencer?.Kana} onChange={HandleChange}
              />
            </div>
            <div className="form-input">
              <div className="input-title">
                学年
              </div>
              <input type="number" name="Grade" className="input-area"
                value={addExperiencer?.Grade} onChange={HandleChange} 
                min="1" max="6" placeholder="選択してください"
              />
            </div>
            <div className="form-input">
              <div className="input-title">
                チーム名
              </div>
              <input list="teams" name="Team" value={addExperiencer?.Team}   
                onChange={(e) => {
                  HandleChange(e);              // 内容を一時保存(配列内に格納)
                  setTeamName(e.target.value);  // チーム名を取得
                }} 
                placeholder="選択または入力" className="input-area"
              />
              <datalist id="teams">
                {teams.map((team: string, index: number) => (
                  <option key={index} value={team} />
                ))}
              </datalist>
            </div>
            <div className="form-input">
              <div className="input-title">
                体験日
              </div>
              <select className="input-area">
                <option value="">選択してください▼</option>
                <option>選択肢のサンプル1</option>
                <option>選択肢のサンプル2</option>
                <option>選択肢のサンプル3</option>
              </select>
            </div>
          </div>
          <div className="button-area">
            <button className="sendbtn" onChange={HandleSave}>
              申込する
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App