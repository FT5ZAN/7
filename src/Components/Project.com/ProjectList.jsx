import { useNavigate } from "react-router-dom";

import styles from "../../Styles/ProjectList.module.css";
function ProjectList({ projects }) {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return <p>No projects found</p>;
  }

  return (
    <div className={styles.list}>
      {projects.map((project) => (
        <div key={project.id} className={styles.card}>
          
          {/* Project Name */}
          <h3 className={styles.name}>{project.name}</h3>

          {/* Status Badge */}
          <span
            className={`${styles.status} ${styles[project.status]}`}
          >
            {project.status}
          </span>

          {/* Progress */}
          <div className={styles.progress}>
            <div
              className={styles.progressBar}
              style={{ width: `${project.progress}%` }}
            />
            <span>{project.progress}%</span>
          </div>

          {/* View Button */}
          <button
            className={styles.viewBtn}
            onClick={() => navigate(`/Projects/${project.id}`)}
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
