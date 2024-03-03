import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

    const itemsPerPage = 20;

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase().trim();
        return (
            user.user_name.toLowerCase().trim() === query ||
            user.location.toLowerCase().trim() === query ||
            (typeof user.age === 'string' && user.age.toLowerCase().trim() === query) || // Check if user.age is a string
            user.created_at.toLowerCase().includes(query)
        );
    });

    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div style={{ marginBottom: "30px" }}>
            <h1 style={{ marginTop: "30px", fontWeight: "bold", fontSize: "20px" }}>CUSTOMER DATA</h1>

            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name, location, date or Time"
                style={{
                    width: '60%',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    border: '2px solid #D1D5DB',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    outline: 'none',
                    marginTop: "30px"

                }}
                onMouseEnter={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)'}
                onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'}
            />

            

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full flex justify-center mb-9 ">
                    <table className="w-5/6 text-s text-left rtl:text-left mt-9 text-gray-500 dark:text-gray-400 ">
                        {/* Table Header */}
                        <thead className="text-s  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-1 py-2">sno</th>
                                <th scope="col" className="px-1 py-2 flex justify-center">customername</th>
                                <th scope="col" className="px-1 py-2">age</th>
                                <th scope="col" className="px-1 py-2 text-right">phone</th>
                                <th scope="col" className="px-1 py-2 text-right">location</th>
                                <th scope="col" className="px-1 py-2 flex justify-center">created_at</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {currentItems.map((user, index) => (
                                <tr key={index} className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.sno}
                                    </th>
                                    <td className="px-1 py-1 flex justify-center">{user.user_name}</td>
                                    <td className="px-1 py-1">{user.age}</td>
                                    <td className="px-1 py-1 text-right">{user.phone}</td>
                                    <td className="px-1 py-1 text-right">{user.location}</td>
                                    <td className="px-1 py-1 flex justify-center">
                                        <span>{new Date(user.created_at).toISOString().slice(0, 10)}</span>
                                        <span className="mx-3">{'  '}</span> {/* Add a gap between date and time */}
                                        <span>{new Date(user.created_at).toLocaleTimeString()}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                </div>
            )}
            <div style={{
                fontSize: "20px", textAlign: "centre", border: "none", cursor: "pointer", utline: "none",
                marginRight: "20px", marginTop: "20px",
            }}>
                <button
                    onClick={() => handlePagination(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ color: currentPage === 1 ? '#acacac' : 'black', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >

                    Previous
                </button>
                <span className="mx-3">{'  '}</span>
                <button
                    onClick={() => handlePagination(currentPage + 1)}
                    disabled={indexOfLastItem >= filteredUsers.length}
                    style={{ color: indexOfLastItem >= filteredUsers.length ? '#acacac' : 'black', cursor: indexOfLastItem >= filteredUsers.length ? 'not-allowed' : 'pointer' }}
                >
                    Next

                </button>


            </div>

        </div>
    );
}

export default Home;
