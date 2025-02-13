
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

    const today = new Date();
    const formatDate = today.toLocaleDateString('ja-JP', { 
        year: 'numeric',    // 年 (例: 2024)
        month: '2-digit',   // 月 (例: 01)
        day: '2-digit'      // 日 (例: 01)
    });

    return (
      <>
        <div className="AllList">
            <div className="TodayData-area">
                <div className="Title-area">
                    <h1>当日データ</h1>
                </div>
                <div className="List-area"> 
                    <table>
                        <thead>
                            <tr>
                            <th>日付</th>
                            <th>出席人数</th>
                            <th>合計金額</th>
                            <th>詳細</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DayData.map((daydata, index) => (
                            <tr key={index}>
                                <td>{formatDate}</td>       {/* 関数から当日の日付を取得 */}
                                <td>{daydata.People}</td>   {/* データベースからフリガナを取得 */}
                                <td>{daydata.Amount}</td>   {/* データベースから学年を取得 */}
                                <td><button>データ詳細</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="PastData-area">
                <div className="Title-area">
                    <h1>過去データ</h1>
                </div>
                <div className="List-area"> 
                    <table>
                        <thead>
                            <tr>
                            <th>日付</th>
                            <th>出席人数</th>
                            <th>合計金額</th>
                            <th>詳細</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PastData.map((pastdata, index) => (
                            <tr key={index}>
                                <td>{pastdata.Pastday}</td>   {/* データベースから過去の日付を取得 */}
                                <td>{pastdata.People}</td>    {/* データベースからフリガナを取得 */}
                                <td>{pastdata.Amount}</td>    {/* データベースから学年を取得 */}
                                <td><button>データ詳細</button></td>
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