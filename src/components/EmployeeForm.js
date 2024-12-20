import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./EmployeeForm.css";
import EmployeeTable from "./EmployeeTable";
import ConfirmationModal from "./ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// Validation schema
// const schema = yup.object().shape({
//     name: yup.string().required("Name is required").matches(/^[a-zA-Z\s]+$/, "Only alphabets allowed"),
//     email: yup.string().email("Invalid email format").required("Email is required"),
//     employeeId: yup.string().required("Employee ID is required").matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric allowed"),
//     phone: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
//     manager: yup.string().nullable(),
//     departmentId: yup.number().nullable(),
// });
const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required")
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets allowed"),
    email: yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    employeeId: yup.string()
        .required("Employee ID is required")
        .max(50, "Employee ID cannot exceed 50 characters")
        .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric allowed"),
    phone: yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    manager: yup.string()
        .nullable()
        .max(50, "Manager ID cannot exceed 50 characters"),
    departmentId: yup.number()
        .nullable()
        .typeError("Select a valid department"),
});
const EmployeeForm = () => {
    const [employees, setEmployees] = useState([]); // State to store employee data
    const [editingEmployee, setEditingEmployee] = useState(null); // Track the employee being edited
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Submit handler

    // const onSubmit = (data) => {
    //     if (editingEmployee !== null) {
    //         // Update existing employee
    //         setEmployees((prevEmployees) =>
    //             prevEmployees.map((emp, index) =>
    //                 index === editingEmployee ? { ...data } : emp
    //             )
    //         );
    //         setEditingEmployee(null);
    //     } else {
    //         // Add new employee
    //         setEmployees((prevEmployees) => [...prevEmployees, data]);
    //     }
    //     reset({
    //         employeeId: "",
    //         name: "",
    //         email: "",
    //         phone: "",
    //         manager: "",
    //         department: "",
    //     });
    // };
    const showToast = (message, type = "success") => {
        if (type === "success") {
            toast.success(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            toast.error(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const onSubmit = async (data) => {
        if (editingEmployee !== null) {
            // Update existing employee via API
            try {
                // Make PUT request to update the employee in the database
                const employeeId = employees[editingEmployee].id; // Get employee ID of the editing employee
                const managerId = data.manager || "";
                const response = await axios.put(`http://localhost:3000/Employees/updateEmployee${employeeId}`,
                    { ...data, managerId },)

                if (response.status === 200) {
                    // Refetch employees after successful update
                    const updatedEmployees = await axios.get("http://localhost:3000/Employees/getEmployee");
                    setEmployees(updatedEmployees.data);
                    showToast("Employee Updated successfully!");
                    reset({
                        employeeId: "",
                        name: "",
                        email: "",
                        phone: "",
                        manager: "",
                        departmentId: "",
                    })
                    setEditingEmployee(null);
                } else {
                    showToast("Failed to update employee", "error");
                }
            } catch (error) {
                showToast("Error updating employee", "error");
            }
        }
        else {

            try {
                const response = await axios.post("http://localhost:3000/Employees/addEmployee", {
                    id: data.employeeId,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    managerId: data.manager || null,
                    departmentId: data.departmentId || null,
                });

                if (response.status === 201) {
                    // Fetch updated employees after successful submission
                    const updatedEmployees = await axios.get("http://localhost:3000/Employees/getEmployee");
                    setEmployees(updatedEmployees.data);
                    showToast("Employee added successfully!");
                    reset({
                        employeeId: "",
                        name: "",
                        email: "",
                        phone: "",
                        manager: "",
                        departmentId: "",
                    });
                } else {
                    showToast("Error adding employee", "error");
                }
            } catch (error) {
                showToast("Error submitting the form", "error");
            }

        }

    };


    const handleEdit = (index) => {
        setEditingEmployee(index);

        // Prefill the form with the selected employee's data
        const selectedEmployee = employees[index];
        const department = departments.find(dept => dept.Department === selectedEmployee.department_name);
        const departmentId = department ? department.id : "";
        reset({
            employeeId: selectedEmployee.id,
            name: selectedEmployee.name,
            email: selectedEmployee.email,
            phone: selectedEmployee.phone,
            manager: selectedEmployee.manager_name || "", // Ensure null or undefined values are set to empty strings
            departmentId: departmentId, // Ensure null or undefined values are set to empty strings
        });
    };


    // Handle delete
    // const handleDelete = (index) => {
    //     setDeleteIndex(index);
    //     setIsModalOpen(true);
    // };
    // const confirmDelete = () => {
    //     setEmployees((prevEmployees) =>
    //         prevEmployees.filter((_, i) => i !== deleteIndex)
    //     );
    //     setIsModalOpen(false);
    //     setDeleteIndex(null);
    // };

    // const cancelDelete = () => {
    //     setIsModalOpen(false);
    //     setDeleteIndex(null);
    // };

    // Delete an employee
    const handleDelete = async () => {
        if (deleteIndex !== null) {
            const employeeId = employees[deleteIndex].id;

            try {
                const response = await axios.delete(`http://localhost:3000/Employees/deleteEmployee${employeeId}`);
                if (response.status === 200) {
                    const updatedEmployees = await axios.get("http://localhost:3000/Employees/getEmployee");
                    setEmployees(updatedEmployees.data);
                    showToast("Employee deleted successfully!");
                } else {
                    showToast("Error deleting employee", "error");
                }
            } catch (error) {
                showToast("Error deleting employee", "error");
            } finally {
                setIsModalOpen(false); // Close the modal
                setDeleteIndex(null); // Reset delete index
            }
        }
    };

    // Open modal for confirmation
    const confirmDelete = (index) => {
        setDeleteIndex(index);
        setIsModalOpen(true);
    };

    // Handle cancel deletion
    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setDeleteIndex(null);
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:3000/Employees/getEmployee");
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/department");
                setDepartments(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchDepartments();
    }, []);
    return (
        <div className="form-container">
            <h1>Employee Management</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="employee-form" id="employee-form">
                <div>
                    <label>Employee ID:</label>
                    <input type="text" {...register("employeeId")} className="input-field" id="id" />
                    {errors.employeeId && <p className="error-message">{errors.employeeId.message}</p>}
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" {...register("name")} className="input-field" id="name" />
                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" {...register("email")} className="input-field" id="email" />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" {...register("phone")} className="input-field" id="phone" />
                    {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                </div>
                <div>
                    <label>Manager:</label>
                    <input type="text" {...register("manager")} className="input-field" id="managerId" />
                </div>
                <div>
                    <label>Department:</label>
                    <select {...register("departmentId")}>
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>{dept.Department}</option>
                        ))}
                    </select>
                    {/* {errors.department && <p className="error-message">{errors.department.message}</p>} */}
                </div>
                <button type="submit">{editingEmployee !== null ? "Update" : "Submit"}</button>
            </form>
            <ToastContainer />
            {/* Employee table */}
            {/* {isLoading ? (<p>Loading Employees...</p>)
                : (
                    <EmployeeTable
                        employees={employees}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )} */}

            {/* <EmployeeTable
                employees={employees}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <ConfirmationModal
                isOpen={isModalOpen}
                message="Are you sure you want to delete this?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            /> */}

            <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={confirmDelete} />
            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleDelete}
                onCancel={handleCancelDelete}
                message="Are you sure you want to delete this employee?"
            />
        </div>
    );
};

export default EmployeeForm;
