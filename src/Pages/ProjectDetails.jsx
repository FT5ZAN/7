// import styles from "../Styles/ProjectDetails.module.css";
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getCompanyById } from "../Api/Api_Methods.jsx";
// import AddProjectModal from "../Components/Project.com/AddProjectModal.jsx";
// import AddProjectMembersModal from "../Components/Project.com/AddProjectMembersModal.jsx";
// import { useDispatch } from "react-redux";
// import { addProjectToTrash } from "../Redux_Tool_Kit/trashSlice";
// import { updateCompanyById } from "../Api/Api_Methods.jsx";

// function ProjectDetails() {
//   const { id } = useParams();

//   const dispatch = useDispatch(); // ✅ moved up
//   const navigate = useNavigate(); // ✅ moved up
//   const [showMemberModal, setShowMemberModal] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProject() {
//       try {
//         const companyId = localStorage.getItem("userId");
//         const res = await getCompanyById(companyId);

//         const foundProject = res.data.projects.find((p) => String(p.id) === id);

//         setProject(foundProject);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProject();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (!project) return <p>Project not found</p>;

//   const handleDelete = async () => {
//     try {
//       const companyId = localStorage.getItem("userId");

//       dispatch(
//         addProjectToTrash({
//           ...project,
//           deletedAt: Date.now(),
//         }),
//       );

//       const res = await getCompanyById(companyId);

//       const updatedProjects = res.data.projects.filter(
//         (p) => p.id !== project.id,
//       );

//       await updateCompanyById(companyId, {
//         ...res.data,
//         projects: updatedProjects,
//       });

//       navigate("/Projects");
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   const handleMembersUpdate = (members) => {
//     setProject((prev) => ({
//       ...prev,
//       teamMembers: members,
//     }));
//   };
//   const handleRemoveMember = async (memberId) => {
//     const updatedMembers = project.teamMembers.filter((m) => m.id !== memberId);

//     const companyId = localStorage.getItem("userId");
//     const res = await getCompanyById(companyId);

//     const updatedProjects = res.data.projects.map((p) =>
//       p.id === project.id ? { ...p, teamMembers: updatedMembers } : p,
//     );

//     await updateCompanyById(companyId, {
//       ...res.data,
//       projects: updatedProjects,
//     });

//     setProject((prev) => ({
//       ...prev,
//       teamMembers: updatedMembers,
//     }));
//   };

//   return (
//     <>
//       <div className={styles.proDetails}>
//         <div className={styles.PDfit}>
//           <div className={styles.layout}>
//             <div className={styles.left}>
//               <button onClick={() => setShowModal(true)}>Edit Project</button>
//               <button onClick={handleDelete}>Delete Project</button>

//               <h2>{project.name}</h2>
//               <p>Status: {project.status}</p>
//               <p>Progress: {project.progress}%</p>
//               <p>Start: {project.startDate}</p>
//               <p>End: {project.endDate}</p>
//               <p>Budget: ₹{project.budget}</p>
//               <p>Risks: {project.risks}</p>
//             </div>
            
//               <div className={styles.right}>
//                 <h3>Working Members</h3>

//                 <button
//                   className={styles.addMemberBtn}
//                   onClick={() => setShowMemberModal(true)}
//                 >
//                   + Add Working Members
//                 </button>

//                 {project.teamMembers.length === 0 && (
//                   <p className={styles.emptyText}>No members added</p>
//                 )}

//                 {project.teamMembers.map((member) => {
//                   const avatar = member.name.charAt(0).toUpperCase();

//                   return (
//                     <div key={member.id} className={styles.memberCard}>
//                       <div className={styles.avatar}>{avatar}</div>

//                       <div className={styles.memberInfo}>
//                         <strong>{member.name}</strong>
//                         <p>{member.role}</p>
//                         <p>{member.department}</p>
//                       </div>

//                       <button
//                         className={styles.removeBtn}
//                         onClick={() => handleRemoveMember(member.id)}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   );
//                 })}
//                 <AddProjectMembersModal
//         show={showMemberModal}
//         onClose={() => setShowMemberModal(false)}
//         project={project}
//         onMemberAdded={handleMembersUpdate}
//       />
//               </div>
            
//           </div>
//         </div>
//       </div>

//       <AddProjectModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         editData={project}
//       />
      
//     </>
//   );
// }
// export default ProjectDetails;

import styles from "../Styles/ProjectDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyById } from "../Api/Api_Methods.jsx";
import AddProjectModal from "../Components/Project.com/AddProjectModal.jsx";
import AddProjectMembersModal from "../Components/Project.com/AddProjectMembersModal.jsx";
import { useDispatch } from "react-redux";
import { addProjectToTrash } from "../Redux_Tool_Kit/trashSlice";
import { updateCompanyById } from "../Api/Api_Methods.jsx";
import { FaArrowLeft } from "react-icons/fa6";

function ProjectDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const companyId = localStorage.getItem("userId");
        const res = await getCompanyById(companyId);
        const foundProject = res.data.projects.find((p) => String(p.id) === id);
        setProject(foundProject);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    try {
      const companyId = localStorage.getItem("userId");
      dispatch(addProjectToTrash({ ...project, deletedAt: Date.now() }));
      const res = await getCompanyById(companyId);
      const updatedProjects = res.data.projects.filter((p) => p.id !== project.id);
      await updateCompanyById(companyId, { ...res.data, projects: updatedProjects });
      navigate("/Projects");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleMembersUpdate = (members) => {
    setProject((prev) => ({ ...prev, teamMembers: members }));
  };

  const handleRemoveMember = async (memberId) => {
    const updatedMembers = project.teamMembers.filter((m) => m.id !== memberId);
    const companyId = localStorage.getItem("userId");
    const res = await getCompanyById(companyId);
    const updatedProjects = res.data.projects.map((p) =>
      p.id === project.id ? { ...p, teamMembers: updatedMembers } : p
    );
    await updateCompanyById(companyId, { ...res.data, projects: updatedProjects });
    setProject((prev) => ({ ...prev, teamMembers: updatedMembers }));
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!project) return <div className={styles.notFound}>Project not found</div>;

  // Get first letter for project avatar
  const projectAvatar = project.name?.charAt(0).toUpperCase() || "P";

  return (
    <>
      <div className={styles.proDetails}>
         <div className={styles.Addemp}>
                            <button
                              className={styles.AddempBtn}
                              onClick={() => navigate("/Projects")}
                            >
                              {" "}
                              <FaArrowLeft />
                                  Back
                             {" "}
                            </button>
                          </div>
        <div className={styles.container}>
          <div className={styles.layout}>
            {/* Left Section - Project Details */}
            <div className={styles.left}>
              <div className={styles.header}>
                <div className={styles.projectHeader}>
                  <div className={styles.projectAvatar}>{projectAvatar}</div>
                  <div className={styles.projectTitle}>
                    <h2 className={styles.projectName}>{project.name}</h2>
                    <span className={`${styles.status} ${styles[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => setShowModal(true)}>
                    <span>Edit</span>
                  </button>
                  <button className={styles.deleteBtn} onClick={handleDelete}>
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Progress</span>
                  <div className={styles.progressSection}>
                    <div className={styles.progressContainer}>
                      <div
                        className={styles.progressBar}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className={styles.progressText}>{project.progress}%</span>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Start Date</span>
                  <span className={styles.detailValue}>{project.startDate || "Not set"}</span>
                </div>

                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>End Date</span>
                  <span className={styles.detailValue}>{project.endDate || "Not set"}</span>
                </div>

                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Budget</span>
                  <span className={styles.detailValue}>₹{project.budget || "0"}</span>
                </div>

                {project.risks && (
                  <div className={`${styles.detailCard} ${styles.fullWidth}`}>
                    <span className={styles.detailLabel}>Risks</span>
                    <span className={styles.detailValue}>{project.risks}</span>
                  </div>
                )}

                {project.description && (
                  <div className={`${styles.detailCard} ${styles.fullWidth}`}>
                    <span className={styles.detailLabel}>Description</span>
                    <span className={styles.detailValue}>{project.description}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Team Members */}
            <div className={styles.right}>
              <div className={styles.teamHeader}>
                <h3 className={styles.teamTitle}>Team Members</h3>
                <span className={styles.memberCount}>{project.teamMembers?.length || 0}</span>
              </div>

              <button
                className={styles.addMemberBtn}
                onClick={() => setShowMemberModal(true)}
              >
                <span>+ Add Members</span>
              </button>

              <div className={styles.membersList}>
                {!project.teamMembers || project.teamMembers.length === 0 ? (
                  <p className={styles.emptyText}>No team members yet</p>
                ) : (
                  project.teamMembers.map((member) => {
                    const avatar = member.name.charAt(0).toUpperCase();
                    return (
                      <div key={member.id} className={styles.memberCard}>
                        <div className={styles.memberAvatar}>{avatar}</div>
                        <div className={styles.memberInfo}>
                          <strong className={styles.memberName}>{member.name}</strong>
                         <span className={styles.coreting}><h5>Role :</h5>   <p className={styles.memberRole}>{member.role}</p></span> 
                        <span  className={styles.coreting}>    <h5>Department :</h5>   <p className={styles.memberDept}>{member.department}</p></span> 
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => handleRemoveMember(member.id)}
                          title="Remove member"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProjectModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          // Refresh project data after edit
          setLoading(true);
          (async () => {
            const companyId = localStorage.getItem("userId");
            const res = await getCompanyById(companyId);
            const updatedProject = res.data.projects.find((p) => String(p.id) === id);
            setProject(updatedProject);
            setLoading(false);
          })();
        }}
        editData={project}
      />

      <AddProjectMembersModal
        show={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        project={project}
        onMemberAdded={handleMembersUpdate}
      />
    </>
  );
}

export default ProjectDetails;
