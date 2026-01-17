import { useState, useEffect } from "react";
import styles from "../Styles/Trash.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cleanupExpiredEmployees } from "../Redux_Tool_Kit/trashSlice";
import {
  restoreEmployeeFromTrash,
  removeEmployeeFromTrash,
} from "../Redux_Tool_Kit/trashSlice";
import { updateCompanyById, getCompanyById } from "../Api/Api_Methods.jsx";
import {
  restoreProjectFromTrash,
  removeProjectFromTrash,
} from "../Redux_Tool_Kit/trashSlice";


function Trash() {
  const trash = useSelector((state) => state.trash);
  const activenexx = useDispatch();
  const dispatch = useDispatch();
  const deletedEmployees = useSelector(
  (state) => state.trash.employees
);
const deletedProjects = useSelector(
  (state) => state.trash.projects
);

const [openId, setOpenId] = useState(null);

const toggleAccordion = (id) => {
  setOpenId(openId === id ? null : id);
};


  console.log("TRASH STATE 👉", trash);

  const [activeTab, setActiveTab] = useState("employees");
  useEffect(() => {
   activenexx (cleanupExpiredEmployees());
  }, []);

const handleRecover = async (employee) => {
  try {
    const companyId = localStorage.getItem("userId");

    const res = await getCompanyById(companyId);

    // 🔥 CLEAN THE EMPLOYEE OBJECT
    const { deletedAt, ...cleanEmployee } = employee;

    const updatedEmployees = [
      ...(res.data.employees || []),
      {
        ...cleanEmployee,
        restoredAt: Date.now(),
      },
    ];

    await updateCompanyById(companyId, {
      ...res.data,
      employees: updatedEmployees,
    });

    // remove from trash
    dispatch(restoreEmployeeFromTrash(employee.id));
  } catch (error) {
    console.error("Recover failed", error);
  }
};

  

const handlePermanentDelete = (id) => {
  dispatch(removeEmployeeFromTrash(id));
};

const handleRecoverProject = async (project) => {
  try {
    const companyId = localStorage.getItem("userId");
    const res = await getCompanyById(companyId);

    // 🔥 remove deletedAt before restoring
    const { deletedAt, ...cleanProject } = project;

    const updatedProjects = [
      ...(res.data.projects || []),
      {
        ...cleanProject,
        restoredAt: Date.now(),
      },
    ];

    await updateCompanyById(companyId, {
      ...res.data,
      projects: updatedProjects,
    });

    dispatch(restoreProjectFromTrash(project.id));
  } catch (error) {
    console.error("Project recover failed", error);
  }
};



const handlePermanentDeleteProject = (id) => {
  dispatch(removeProjectFromTrash(id));
};


  return (
    <div className={styles.container}>
      {/* Tabs Header */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "employees" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("employees")}
        >
          Employees
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === "projects" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
      </div>

      {/* Tabs Content */}
      <div className={styles.content}>
        {/* {activeTab === "employees" && (
          <div>
            <h2>Employees</h2>
            <p>Employees trash data here</p>
          </div>
        )} */}

        {activeTab === "employees" && (
  <div>
    <h2>Deleted Employees</h2>

    {deletedEmployees.length === 0 && (
      <p>No deleted employees</p>
    )}

    {deletedEmployees.map((emp) => (
      <div key={emp.id} className={styles.card}>
        {/* Accordion Header */}
        <div
          className={styles.header}
          onClick={() => toggleAccordion(emp.id)}
        >
          <strong>{emp.name}</strong>
          <span>
            Deleted{" "}
            {new Date(emp.deletedAt).toLocaleString()}
          </span>
        </div>

        {/* Accordion Body */}
        {openId === emp.id && (
          <div className={styles.body}>
            <p>Email: {emp.email}</p>
            <p>Role: {emp.role}</p>
            <p>Department: {emp.department}</p>
            <p>Status: {emp.status}</p>
            <p>Salary: {emp.salary} LPA</p>
            <p>Experience: {emp.experience}</p>
            <p>Joining Date: {emp.joiningDate}</p>

            <div className={styles.actions}>
              <button
                className={styles.recover}
                onClick={() => handleRecover(emp)}
              >
                Recover
              </button>

              <button
                className={styles.delete}
                onClick={() =>
                  handlePermanentDelete(emp.id)
                }
              >
                Delete Permanently
              </button>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
)}


        {/* {activeTab === "projects" && (
          <div>
            <h2>Projects</h2>
            <p>Projects trash data here</p>
          </div>
        )} */}
        {activeTab === "projects" && (
  <div>
    <h2>Deleted Projects</h2>

    {deletedProjects.length === 0 && (
      <p>No deleted projects</p>
    )}

    {deletedProjects.map((project) => (
      <div key={project.id} className={styles.card}>
        {/* Accordion Header */}
        <div
          className={styles.header}
          onClick={() => toggleAccordion(project.id)}
        >
          <strong>{project.name}</strong>
          <span>
            Deleted {new Date(project.deletedAt).toLocaleString()}
          </span>
        </div>

        {/* Accordion Body */}
        {openId === project.id && (
          <div className={styles.body}>
            <p>Status: {project.status}</p>
            <p>Progress: {project.progress}%</p>
            <p>Start: {project.startDate}</p>
            <p>End: {project.endDate}</p>
            <p>Budget: ₹{project.budget}</p>
            <p>Risks: {project.risks}</p>

            <div className={styles.actions}>
              <button
                className={styles.recover}
                onClick={() => handleRecoverProject(project)}
              >
                Recover
              </button>

              <button
                className={styles.delete}
                onClick={() =>
                  handlePermanentDeleteProject(project.id)
                }
              >
                Delete Permanently
              </button>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
}

export default Trash;
