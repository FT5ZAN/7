import styles from "../Styles/ProjectDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyById } from "../Api/Api_Methods.jsx";
import AddProjectModal from "../Components/Project.com/AddProjectModal.jsx";
import AddProjectMembersModal from "../Components/Project.com/AddProjectMembersModal.jsx";
import { useDispatch } from "react-redux";
import { addProjectToTrash } from "../Redux_Tool_Kit/trashSlice";
import { updateCompanyById } from "../Api/Api_Methods.jsx";

function ProjectDetails() {
  const { id } = useParams();

  const dispatch = useDispatch(); // ✅ moved up
  const navigate = useNavigate(); // ✅ moved up
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

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  const handleDelete = async () => {
    try {
      const companyId = localStorage.getItem("userId");

      dispatch(
        addProjectToTrash({
          ...project,
          deletedAt: Date.now(),
        }),
      );

      const res = await getCompanyById(companyId);

      const updatedProjects = res.data.projects.filter(
        (p) => p.id !== project.id,
      );

      await updateCompanyById(companyId, {
        ...res.data,
        projects: updatedProjects,
      });

      navigate("/Projects");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleMembersUpdate = (members) => {
    setProject((prev) => ({
      ...prev,
      teamMembers: members,
    }));
  };
  const handleRemoveMember = async (memberId) => {
    const updatedMembers = project.teamMembers.filter((m) => m.id !== memberId);

    const companyId = localStorage.getItem("userId");
    const res = await getCompanyById(companyId);

    const updatedProjects = res.data.projects.map((p) =>
      p.id === project.id ? { ...p, teamMembers: updatedMembers } : p,
    );

    await updateCompanyById(companyId, {
      ...res.data,
      projects: updatedProjects,
    });

    setProject((prev) => ({
      ...prev,
      teamMembers: updatedMembers,
    }));
  };

  return (
    <>
      <div className={styles.proDetails}>
        <div className={styles.PDfit}>
          <div className={styles.layout}>
            <div className={styles.left}>
              <button onClick={() => setShowModal(true)}>Edit Project</button>
              <button onClick={handleDelete}>Delete Project</button>

              <h2>{project.name}</h2>
              <p>Status: {project.status}</p>
              <p>Progress: {project.progress}%</p>
              <p>Start: {project.startDate}</p>
              <p>End: {project.endDate}</p>
              <p>Budget: ₹{project.budget}</p>
              <p>Risks: {project.risks}</p>
            </div>
            
              <div className={styles.right}>
                <h3>Working Members</h3>

                <button
                  className={styles.addMemberBtn}
                  onClick={() => setShowMemberModal(true)}
                >
                  + Add Working Members
                </button>

                {project.teamMembers.length === 0 && (
                  <p className={styles.emptyText}>No members added</p>
                )}

                {project.teamMembers.map((member) => {
                  const avatar = member.name.charAt(0).toUpperCase();

                  return (
                    <div key={member.id} className={styles.memberCard}>
                      <div className={styles.avatar}>{avatar}</div>

                      <div className={styles.memberInfo}>
                        <strong>{member.name}</strong>
                        <p>{member.role}</p>
                        <p>{member.department}</p>
                      </div>

                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
                <AddProjectMembersModal
        show={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        project={project}
        onMemberAdded={handleMembersUpdate}
      />
              </div>
            
          </div>
        </div>
      </div>

      <AddProjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        editData={project}
      />
      {/* <AddProjectMembersModal
        show={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        project={project}
        onMemberAdded={handleMembersUpdate}
      /> */}
    </>
  );
}
export default ProjectDetails;
