


function AllList() {

  // 擬似配列(生徒一覧データ)
  const students = [
    { team: 'FCバルセロナ', name: '水野谷 一樹', kana: 'ミズノヤ カズキ', grade: 6 },
    // 他の生徒データも同様にデータベースから全て追加
  ];

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
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>   {/* データベースから氏名を取得 */}
                  <td>{student.kana}</td>   {/* データベースからフリガナを取得 */}
                  <td>{student.grade}</td>  {/* データベースから学年を取得 */}
                  <td>{student.team}</td>   {/* データベースからチーム名を取得 */}
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