import { useReducer, useEffect } from "react";
import { getCompanyById, updateCompanyById } from "../../Api/Api_Methods.jsx";

// Inline styles simulating module CSS
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#0a1929",
    borderRadius: "8px",
    padding: "32px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    border: "1px solid #1e3a5f",
  },
  title: {
    color: "#2196f3",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #1e3a5f",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "24px",
  },
  formGroupFull: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    gridColumn: "1 / -1",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "#8b9dc3",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#0d1f33",
    border: "1px solid #1e3a5f",
    borderRadius: "6px",
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  textarea: {
    backgroundColor: "#0d1f33",
    border: "1px solid #1e3a5f",
    borderRadius: "6px",
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    minHeight: "80px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  select: {
    backgroundColor: "#0d1f33",
    border: "1px solid #1e3a5f",
    borderRadius: "6px",
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    paddingTop: "20px",
    borderTop: "1px solid #1e3a5f",
  },
  addButton: {
    backgroundColor: "#2196f3",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "12px 32px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  cancelButton: {
    backgroundColor: "transparent",
    color: "#8b9dc3",
    border: "1px solid #1e3a5f",
    borderRadius: "6px",
    padding: "12px 32px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

const emptyData = {
  name: "",
  description: "",
  status: "",
  startDate: "",
  endDate: "",
  budget: "",
  progress: "",
  risks: "",
};

function reducer(state, action) {
  return { ...state, [action.type]: action.val };
}

function AddProjectModal({ show, onClose ,editData }) {
  const [data, dispatch] = useReducer(reducer, emptyData);

//   const handleSubmit = () => {
//     console.log("PROJECT DATA 👉", data);
//     // Add your submit logic here
//     onClose();
//   };

useEffect(() => {
  if (editData) {
    Object.keys(emptyData).forEach((key) => {
      if (key in editData) {
        dispatch({ type: key, val: editData[key] });
      }
    });
  }
}, [editData]);


// const handleSubmit = async () => {
//   if (!data.name || !data.status) {
//     alert("Project name and status are required");
//     return;
//   }

//   try {
//     const companyId = localStorage.getItem("userId");
//     const res = await getCompanyById(companyId);
//     const company = res.data;

//     const newProject = {
//       id: Date.now(),
//       name: data.name,
//       description: data.description,
//       status: data.status,
//       startDate: data.startDate,
//       endDate: data.endDate,
//       budget: Number(data.budget || 0),
//       progress: Number(data.progress || 0),
//     //   objectives: "",
//     //   deliverables: "",
//       risks: data.risks,
//       teamMembers: [], // 👈 important
//       createdAt: new Date().toISOString(),
//     };

//     const updatedProjects = [
//       ...(company.projects || []),
//       newProject,
//     ];

//     await updateCompanyById(companyId, {
//       ...company,
//       projects: updatedProjects,
//     });

//     alert("Project added successfully");
//     onClose();
//   } catch (error) {
//     console.error("Add project failed", error);
//     alert("Failed to add project");
//   }
// };
const handleSubmit = async () => {
  if (!data.name || !data.status) {
    alert("Project name and status are required");
    return;
  }

  try {
    const companyId = localStorage.getItem("userId");
    const res = await getCompanyById(companyId);
    const company = res.data;

    let updatedProjects;

    if (editData) {
      // ✏️ EDIT MODE
      updatedProjects = company.projects.map((p) =>
        p.id === editData.id
          ? { ...p, ...data }
          : p
      );
    } else {
      // ➕ ADD MODE
      const newProject = {
        id: Date.now(),
        ...data,
        budget: Number(data.budget || 0),
        progress: Number(data.progress || 0),
        teamMembers: [],
        createdAt: new Date().toISOString(),
      };

      updatedProjects = [...(company.projects || []), newProject];
    }

    await updateCompanyById(companyId, {
      ...company,
      projects: updatedProjects,
    });

    onClose();
  } catch (err) {
    console.error("Project save failed", err);
    alert("Failed to save project");
  }
};


  if (!show) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>Add New Project</h3>

        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Project Name</label>
            <input
              style={styles.input}
              placeholder="Project name"
              //   value={data.projectname}
              //   onChange={(e) => dispatch({ type: "projectname", val: e.target.value })}
              value={data.name}
              onChange={(e) => dispatch({ type: "name", val: e.target.value })}
              onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <select
              style={styles.select}
              value={data.status}
              onChange={(e) =>
                dispatch({ type: "status", val: e.target.value })
              }
              onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            >
              <option value="">Select status</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div style={styles.formGroupFull}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              placeholder="Project description"
              value={data.description}
              onChange={(e) =>
                dispatch({ type: "description", val: e.target.value })
              }
              onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Start Date</label>
            <input
              style={styles.input}
              type="date"
              value={data.startDate}
              onChange={(e) =>
                dispatch({ type: "startDate", val: e.target.value })
              }
              onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>End Date</label>
            <input
              style={styles.input}
              type="date"
              value={data.endDate}
              onChange={(e) =>
                dispatch({ type: "endDate", val: e.target.value })
              }
              onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Budget</label>
            <input
              style={styles.input}
              type="number"
              placeholder="e.g. 100000"
              value={data.budget}
              onChange={(e) =>
                dispatch({ type: "budget", val: e.target.value })
              }
              onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Progress (%)</label>
            <input
              style={styles.input}
              type="number"
              placeholder="e.g. 45"
              min="0"
              max="100"
              value={data.progress}
              onChange={(e) =>
                dispatch({ type: "progress", val: e.target.value })
              }
              onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
          </div>

          <div style={styles.formGroupFull}>
            <label style={styles.label}>Risks</label>
            <textarea
              style={styles.textarea}
              placeholder="Project risks"
              value={data.risks}
              onChange={(e) => dispatch({ type: "risks", val: e.target.value })}
              onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={styles.cancelButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#2196f3";
              e.target.style.color = "#2196f3";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#1e3a5f";
              e.target.style.color = "#8b9dc3";
            }}
          >
            CANCEL
          </button>
          <button
            style={styles.addButton}
            onClick={handleSubmit}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1976d2")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2196f3")}
          >
           {editData ? "Save Changes" : "Add Project"}
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;
