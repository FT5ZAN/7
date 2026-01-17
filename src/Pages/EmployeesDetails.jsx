import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyById } from "../Api/Api_Methods.jsx";
import { updateCompanyById } from "../Api/Api_Methods.jsx";
import styles from "../Styles/EmployeesDetails.module.css";
import Addmodal from "../Components/Employ.com/Addmodal.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployeeToTrash } from "../Redux_Tool_Kit/trashSlice";

function EmployeesDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const companyId = localStorage.getItem("userId");
        const res = await getCompanyById(companyId);

        const foundEmployee = res.data.employees.find(
          (emp) => String(emp.id) === id
        );

        setEmployee(foundEmployee);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

 
  const handleDelete = async () => {
  try {
    const companyId = localStorage.getItem("userId");

    // 1️⃣ Add to trash (Redux)
    dispatch(
      addEmployeeToTrash({
        ...employee,
        deletedAt: Date.now(),
      })
    );

    // 2️⃣ Remove from MockAPI
    const res = await getCompanyById(companyId);

    const updatedEmployees = res.data.employees.filter(
      (emp) => emp.id !== employee.id
    );

    await updateCompanyById(companyId, {
      ...res.data,
      employees: updatedEmployees,
    });

    // 3️⃣ Redirect to Employees page
    navigate("/Employees");
  } catch (error) {
    console.error("Delete failed", error);
  }
};


  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <>
      <div className={styles.empDetails}>
        <div className={styles.EDfit}>
          <h2>{employee.name}</h2>
          <button className={styles.editBtn} onClick={() => setShowModal(true)}>
            Edit 
          </button>
          <button className={styles.deleteBtn} onClick={handleDelete}>
  Delete
</button>

          <p>Email: {employee.email}</p>
          <p>Role: {employee.role}</p>
          <p>Department: {employee.department}</p>
          <p>Status: {employee.status}</p>
          <p>Salary: {employee.salary} LPA</p>
          <p>Experience: {employee.experience}</p>
          <p>Joining Date: {employee.joiningDate}</p>
        </div>
      </div>
      <Addmodal
        show={showModal}
        // onClose={() => setShowModal(false)}
        onClose={() => {
          setShowModal(false);
          setLoading(true);

          (async () => {
            const companyId = localStorage.getItem("userId");
            const res = await getCompanyById(companyId);
            const updatedEmployee = res.data.employees.find(
              (emp) => String(emp.id) === id
            );
            setEmployee(updatedEmployee);
            setLoading(false);
          })();
        }}
        editData={employee}
      />
    </>
  );
}

export default EmployeesDetails;
