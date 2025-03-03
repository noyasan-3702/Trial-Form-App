import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";
import './App.css'

function Form() {
    const [ Attendances, setAttendances ] = useState<any>([])

  // 初回読み込み
  useEffect(() => {
    // 体験者情報データベースにアクセス
    const AttendanceData = collection(db, "出席状況")

    // データを取得できたら、配列内にデータを格納
    getDocs(AttendanceData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })))
      setAttendances(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  return (
    <>
      <div>
        ななんあ
      </div>
    </>
  )
}

export default Form