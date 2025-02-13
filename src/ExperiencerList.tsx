

function ExperiencerList() {

    // 擬似配列
    const Experiencers = [
      { ExperienceDay: "2025/02/13", team: 'FCバルセロナ', name: '水野谷 一樹', kana: 'ミズノヤ カズキ', grade: 6 },
      // 他の生徒データも同様にデータベースから全て追加
    ];
  
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
                {Experiencers.map((Experiencer, index) => (
                  <tr key={index}>
                    <td>{Experiencer.ExperienceDay}</td>    {/* データベースから氏名を取得 */}
                    <td>{Experiencer.name}</td>             {/* データベースから氏名を取得 */}
                    <td>{Experiencer.kana}</td>             {/* データベースからフリガナを取得 */}
                    <td>{Experiencer.grade}</td>            {/* データベースから学年を取得 */}
                    <td>{Experiencer.team}</td>             {/* データベースからチーム名を取得 */}
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