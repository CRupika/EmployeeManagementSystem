// import React, { useState } from "react";
// import "./EmployeeForm.css"; // Reuse styling

// const EmployeeTable = ({ employees, onEdit, onDelete }) => {
//     const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
//     const [currentPage, setCurrentPage] = useState(1); // Current page
//     const recordsPerPage = 5; // Number of records per page

//     console.log("employees", employees);
//     const filteredEmployees = employees.filter((employee) => {
//         const lowerQuery = searchQuery.toLowerCase();
//         return (
//             employee.name.toLowerCase().includes(lowerQuery) || // Search by Name
//             employee.id.toLowerCase().includes(lowerQuery) || // Search by Employee ID
//             employee.department_name.toLowerCase().includes(lowerQuery) // Search by Department
//         );
//     });
//     const totalRecords = filteredEmployees.length;
//     const totalPages = Math.ceil(totalRecords / recordsPerPage);
//     const startIndex = (currentPage - 1) * recordsPerPage;
//     const endIndex = startIndex + recordsPerPage;
//     const currentRecords = filteredEmployees.slice(startIndex, endIndex);

//     // Handle page change
//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };
//     return (
//         <div className="table-container">
//             <h2>Employee List</h2>

//             {/* Search Bar */}
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="Search by Name, Employee ID, or Department"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="search-input"
//                 />
//             </div>

//             {filteredEmployees.length === 0 ? (
//                 <p>No employees match your search.</p>
//             ) : (
//                 <>
//                     <table className="employee-table">
//                         <thead>
//                             <tr>
//                                 <th>Employee ID</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Phone</th>
//                                 <th>Manager</th>
//                                 <th>Department</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredEmployees.map((employee, index) => (
//                                 <tr key={index}>
//                                     <td>{employee.id}</td>
//                                     <td>{employee.name}</td>
//                                     <td>{employee.email}</td>
//                                     <td>{employee.phone}</td>
//                                     <td>{employee.manager_name || "N/A"}</td>
//                                     <td>{employee.department_name}</td>
//                                     <td>
//                                         <button onClick={() => onEdit(index)} className="edit-btn">
//                                             Edit
//                                         </button>
//                                         <button onClick={() => onDelete(index)} className="delete-btn">
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <div className="pagination-container">
//                         <button
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                             className="pagination-btn"
//                         >
//                             Previous
//                         </button>
//                         {Array.from({ length: totalPages }, (_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => handlePageChange(index + 1)}
//                                 className={`pagination-btn ${currentPage === index + 1 ? "active" : ""
//                                     }`}
//                             >
//                                 {index + 1}
//                             </button>
//                         ))}
//                         <button
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                             className="pagination-btn"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </>
//             )}
//         </div>
//         // <div className="table-container">
//         //     <h2>Employee List</h2>
//         //     {employees.length === 0 ? (
//         //         <p>No employees added yet.</p>
//         //     ) : (
//         //         <table className="employee-table">
//         //             <thead>
//         //                 <tr>
//         //                     <th>Employee ID</th>
//         //                     <th>Name</th>
//         //                     <th>Email</th>
//         //                     <th>Phone</th>
//         //                     <th>Manager</th>
//         //                     <th>Department</th>
//         //                     <th>Actions</th>
//         //                 </tr>
//         //             </thead>
//         //             <tbody>
//         //                 {employees.map((employee, index) => (
//         //                     <tr key={index}>
//         //                         <td>{employee.id}</td>
//         //                         <td>{employee.name}</td>
//         //                         <td>{employee.email}</td>
//         //                         <td>{employee.phone}</td>
//         //                         <td>{employee.manager_name || "N/A"}</td>
//         //                         <td>{employee.department_name}</td>
//         //                         <td>
//         //                             <button onClick={() => onEdit(index)} className="edit-btn">
//         //                                 Edit
//         //                             </button>
//         //                             <button onClick={() => onDelete(index)} className="delete-btn">
//         //                                 Delete
//         //                             </button>
//         //                         </td>
//         //                     </tr>
//         //                 ))}
//         //             </tbody>
//         //         </table>
//         //     )}
//         // </div>
//     );
// };

// export default EmployeeTable;
import React, { useState } from "react";
import "./EmployeeForm.css"; // Reuse styling

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
    const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const recordsPerPage = 5; // Number of records per page

    const filteredEmployees = employees.filter((employee) => {
        const lowerQuery = searchQuery.toLowerCase();
        return (
            employee.name.toLowerCase().includes(lowerQuery) || // Search by Name
            employee.id.toLowerCase().includes(lowerQuery) || // Search by Employee ID
            employee.department_name.toLowerCase().includes(lowerQuery) // Search by Department
        );
    });

    const totalRecords = filteredEmployees.length; // Total filtered records
    const totalPages = Math.ceil(totalRecords / recordsPerPage); // Total pages
    const startIndex = (currentPage - 1) * recordsPerPage; // Start index of current page
    const endIndex = startIndex + recordsPerPage; // End index of current page
    const currentRecords = filteredEmployees.slice(startIndex, endIndex); // Records for current page

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="table-container">
            <h2>Employee List</h2>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Name, Employee ID, or Department"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                    }}
                    className="search-input"
                />
            </div>

            {filteredEmployees.length === 0 ? (
                <p>No employees match your search.</p>
            ) : (
                <>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Manager</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.manager_name || "N/A"}</td>
                                    <td>{employee.department_name}</td>
                                    <td>
                                        <button onClick={() => onEdit(index)} className="edit-btn">
                                            Edit
                                        </button>
                                        <button onClick={() => onDelete(index)} className="delete-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination-container">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default EmployeeTable;
