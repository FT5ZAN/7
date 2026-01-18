// import { useState, useEffect } from "react";
// import styles from "../Styles/Trash.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { cleanupExpiredEmployees } from "../Redux_Tool_Kit/trashSlice";
// import {
//   restoreEmployeeFromTrash,
//   removeEmployeeFromTrash,
// } from "../Redux_Tool_Kit/trashSlice";
// import { updateCompanyById, getCompanyById } from "../Api/Api_Methods.jsx";
// import {
//   restoreProjectFromTrash,
//   removeProjectFromTrash,
// } from "../Redux_Tool_Kit/trashSlice";


// function Trash() {
//   const trash = useSelector((state) => state.trash);
//   const activenexx = useDispatch();
//   const dispatch = useDispatch();
//   const deletedEmployees = useSelector(
//   (state) => state.trash.employees
// );
// const deletedProjects = useSelector(
//   (state) => state.trash.projects
// );

// const [openId, setOpenId] = useState(null);

// const toggleAccordion = (id) => {
//   setOpenId(openId === id ? null : id);
// };


//   console.log("TRASH STATE 👉", trash);

//   const [activeTab, setActiveTab] = useState("employees");
//   useEffect(() => {
//    activenexx (cleanupExpiredEmployees());
//   }, []);

// const handleRecover = async (employee) => {
//   try {
//     const companyId = localStorage.getItem("userId");

//     const res = await getCompanyById(companyId);

//     // 🔥 CLEAN THE EMPLOYEE OBJECT
//     const { deletedAt, ...cleanEmployee } = employee;

//     const updatedEmployees = [
//       ...(res.data.employees || []),
//       {
//         ...cleanEmployee,
//         restoredAt: Date.now(),
//       },
//     ];

//     await updateCompanyById(companyId, {
//       ...res.data,
//       employees: updatedEmployees,
//     });

//     // remove from trash
//     dispatch(restoreEmployeeFromTrash(employee.id));
//   } catch (error) {
//     console.error("Recover failed", error);
//   }
// };

  

// const handlePermanentDelete = (id) => {
//   dispatch(removeEmployeeFromTrash(id));
// };

// const handleRecoverProject = async (project) => {
//   try {
//     const companyId = localStorage.getItem("userId");
//     const res = await getCompanyById(companyId);

//     // 🔥 remove deletedAt before restoring
//     const { deletedAt, ...cleanProject } = project;

//     const updatedProjects = [
//       ...(res.data.projects || []),
//       {
//         ...cleanProject,
//         restoredAt: Date.now(),
//       },
//     ];

//     await updateCompanyById(companyId, {
//       ...res.data,
//       projects: updatedProjects,
//     });

//     dispatch(restoreProjectFromTrash(project.id));
//   } catch (error) {
//     console.error("Project recover failed", error);
//   }
// };



// const handlePermanentDeleteProject = (id) => {
//   dispatch(removeProjectFromTrash(id));
// };


//   return (
//     <div className={styles.container}>
//       {/* Tabs Header */}
//       <div className={styles.tabs}>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "employees" ? styles.active : ""
//           }`}
//           onClick={() => setActiveTab("employees")}
//         >
//           Employees
//         </button>

//         <button
//           className={`${styles.tab} ${
//             activeTab === "projects" ? styles.active : ""
//           }`}
//           onClick={() => setActiveTab("projects")}
//         >
//           Projects
//         </button>
//       </div>

//       {/* Tabs Content */}
//       <div className={styles.content}>
//         {/* {activeTab === "employees" && (
//           <div>
//             <h2>Employees</h2>
//             <p>Employees trash data here</p>
//           </div>
//         )} */}

//         {activeTab === "employees" && (
//   <div>
//     <h2>Deleted Employees</h2>

//     {deletedEmployees.length === 0 && (
//       <p>No deleted employees</p>
//     )}

//     {deletedEmployees.map((emp) => (
//       <div key={emp.id} className={styles.card}>
//         {/* Accordion Header */}
//         <div
//           className={styles.header}
//           onClick={() => toggleAccordion(emp.id)}
//         >
//           <strong>{emp.name}</strong>
//           <span>
//             Deleted{" "}
//             {new Date(emp.deletedAt).toLocaleString()}
//           </span>
//         </div>

//         {/* Accordion Body */}
//         {openId === emp.id && (
//           <div className={styles.body}>
//             <p>Email: {emp.email}</p>
//             <p>Role: {emp.role}</p>
//             <p>Department: {emp.department}</p>
//             <p>Status: {emp.status}</p>
//             <p>Salary: {emp.salary} LPA</p>
//             <p>Experience: {emp.experience}</p>
//             <p>Joining Date: {emp.joiningDate}</p>

//             <div className={styles.actions}>
//               <button
//                 className={styles.recover}
//                 onClick={() => handleRecover(emp)}
//               >
//                 Recover
//               </button>

//               <button
//                 className={styles.delete}
//                 onClick={() =>
//                   handlePermanentDelete(emp.id)
//                 }
//               >
//                 Delete Permanently
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     ))}
//   </div>
// )}


//         {/* {activeTab === "projects" && (
//           <div>
//             <h2>Projects</h2>
//             <p>Projects trash data here</p>
//           </div>
//         )} */}
//         {activeTab === "projects" && (
//   <div>
//     <h2>Deleted Projects</h2>

//     {deletedProjects.length === 0 && (
//       <p>No deleted projects</p>
//     )}

//     {deletedProjects.map((project) => (
//       <div key={project.id} className={styles.card}>
//         {/* Accordion Header */}
//         <div
//           className={styles.header}
//           onClick={() => toggleAccordion(project.id)}
//         >
//           <strong>{project.name}</strong>
//           <span>
//             Deleted {new Date(project.deletedAt).toLocaleString()}
//           </span>
//         </div>

//         {/* Accordion Body */}
//         {openId === project.id && (
//           <div className={styles.body}>
//             <p>Status: {project.status}</p>
//             <p>Progress: {project.progress}%</p>
//             <p>Start: {project.startDate}</p>
//             <p>End: {project.endDate}</p>
//             <p>Budget: ₹{project.budget}</p>
//             <p>Risks: {project.risks}</p>

//             <div className={styles.actions}>
//               <button
//                 className={styles.recover}
//                 onClick={() => handleRecoverProject(project)}
//               >
//                 Recover
//               </button>

//               <button
//                 className={styles.delete}
//                 onClick={() =>
//                   handlePermanentDeleteProject(project.id)
//                 }
//               >
//                 Delete Permanently
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     ))}
//   </div>
// )}

//       </div>
//     </div>
//   );
// }

// export default Trash;

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
  const deletedEmployees = useSelector((state) => state.trash.employees);
  const deletedProjects = useSelector((state) => state.trash.projects);

  const [openId, setOpenId] = useState(null);
  const [activeTab, setActiveTab] = useState("employees");

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  console.log("TRASH STATE 👉", trash);

  useEffect(() => {
    activenexx(cleanupExpiredEmployees());
  }, []);

  const handleRecover = async (employee) => {
    try {
      const companyId = localStorage.getItem("userId");
      const res = await getCompanyById(companyId);

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
      {/* Header */}
      {/* <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Trash</h1>
        <p className={styles.pageSubtitle}>
          Recover or permanently delete items
        </p>
      </div> */}

      {/* Tabs Header */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "employees" ? styles.active : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          <span>Employees</span>
          <span className={styles.badge}>{deletedEmployees.length}</span>
        </button>

        <button
          className={`${styles.tab} ${activeTab === "projects" ? styles.active : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <span>Projects</span>
          <span className={styles.badge}>{deletedProjects.length}</span>
        </button>
      </div>

      {/* Tabs Content */}
      <div className={styles.content}>
        {/* EMPLOYEES TAB */}
        {activeTab === "employees" && (
          <div className={styles.tabContent}>
            {deletedEmployees.length === 0 ? (
              <div className={styles.emptyState}>
                
                <h3>No Deleted Employees u dont have any think</h3>
                <p>Your employee trash is empty</p>
              </div>
            ) : (
              deletedEmployees.map((emp) => {
                const avatar = emp.name?.charAt(0).toUpperCase() || "E";
                const isOpen = openId === emp.id;

                return (
                  <div key={emp.id} className={styles.card}>
                    {/* Card Header - Always Visible */}
                    <div className={styles.cardHeader}>
                      {/* Left Section - Avatar + Name */}
                      <div className={styles.cardLeft}>
                        <div className={styles.avatar}>{avatar}</div>
                        <div className={styles.nameSection}>
                          <strong className={styles.name}>{emp.name}</strong>
                          <span className={styles.role}>{emp.role}</span>
                        </div>
                      </div>

                      {/* Right Section - Actions */}
                      <div className={styles.cardActions}>
                        <button
                          className={styles.recoverBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRecover(emp);
                          }}
                        >
                          <span>Recover</span>
                        </button>

                        <button
                          className={styles.deleteBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePermanentDelete(emp.id);
                          }}
                        >
                          <span>Delete</span>
                        </button>

                        <button
                          className={styles.accordionBtn}
                          onClick={() => toggleAccordion(emp.id)}
                        >
                          <svg
                            className={`${styles.accordionIcon} ${isOpen ? styles.open : ""}`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M5 7.5L10 12.5L15 7.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Accordion Body - Details */}
                    {isOpen && (
                      <div className={styles.cardBody}>
                        <div className={styles.detailsGrid}>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Email</span>
                            <span className={styles.detailValue}>{emp.email}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Department</span>
                            <span className={styles.detailValue}>{emp.department}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Status</span>
                            <span className={styles.detailValue}>{emp.status}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Salary</span>
                            <span className={styles.detailValue}>{emp.salary} LPA</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Experience</span>
                            <span className={styles.detailValue}>{emp.experience}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Joining Date</span>
                            <span className={styles.detailValue}>{emp.joiningDate}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className={styles.tabContent}>
            {deletedProjects.length === 0 ? (
              <div className={styles.emptyState}>
                
                <h3> u dont have any think </h3>
                <p>Your project trash is empty</p>
              </div>
            ) : (
              deletedProjects.map((project) => {
                const avatar = project.name?.charAt(0).toUpperCase() || "P";
                const isOpen = openId === project.id;

                return (
                  <div key={project.id} className={styles.card}>
                    {/* Card Header - Always Visible */}
                    <div className={styles.cardHeader}>
                      {/* Left Section - Avatar + Name */}
                      <div className={styles.cardLeft}>
                        <div className={styles.avatar}>{avatar}</div>
                        <div className={styles.nameSection}>
                          <strong className={styles.name}>{project.name}</strong>
                          <span className={styles.role}>{project.status}</span>
                        </div>
                      </div>

                      {/* Right Section - Actions */}
                      <div className={styles.cardActions}>
                        <button
                          className={styles.recoverBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRecoverProject(project);
                          }}
                        >
                          <span>Recover</span>
                        </button>

                        <button
                          className={styles.deleteBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePermanentDeleteProject(project.id);
                          }}
                        >
                          <span>Delete</span>
                        </button>

                        <button
                          className={styles.accordionBtn}
                          onClick={() => toggleAccordion(project.id)}
                        >
                          <svg
                            className={`${styles.accordionIcon} ${isOpen ? styles.open : ""}`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M5 7.5L10 12.5L15 7.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Accordion Body - Details */}
                    {isOpen && (
                      <div className={styles.cardBody}>
                        <div className={styles.detailsGrid}>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Progress</span>
                            <span className={styles.detailValue}>{project.progress}%</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Start Date</span>
                            <span className={styles.detailValue}>{project.startDate}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>End Date</span>
                            <span className={styles.detailValue}>{project.endDate}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Budget</span>
                            <span className={styles.detailValue}>₹{project.budget}</span>
                          </div>
                          {project.risks && (
                            <div className={`${styles.detailItem} ${styles.fullWidth}`}>
                              <span className={styles.detailLabel}>Risks</span>
                              <span className={styles.detailValue}>{project.risks}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Trash;