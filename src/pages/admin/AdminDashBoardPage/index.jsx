

const columns = [
    { key: "id", label: "ID" },
    { key: "email", label: "이메일" }
];

const data = [
    { id: 1, name: "홍길동", username: "hong@example.com" },
    { id: 2, name: "김철수", email: "kim@example.com" },
    { id: 3, name: "이영희", email: "lee@example.com" },
];


const AdminDashBoardPage = ({className}) => {
    return <div className='container'>
        <div className='mx-auto'>
            <h1 className='font-semibold'>사용자 조회</h1>
            <h2> 바보 </h2>
            <div className={`overflow-x-auto ${className}`}>
                <table className="rounded-md border mx-auto w-full">
                    {/* 테이블 헤더 */}
                    <thead className="bg-gray-100 border-b">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="text-left px-4 py-2 font-semibold">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    {/* 테이블 본문 */}
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-2">
                                    {row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default AdminDashBoardPage;