// import { createSlice } from "@reduxjs/toolkit";

// // Load trash from localStorage (on refresh)
// const loadTrash = () => {
//   const data = localStorage.getItem("trash");
//   return data ? JSON.parse(data) : { employees: [], projects: [] };
// };

// const initialState = loadTrash();

// const trashSlice = createSlice({
//   name: "trash",
//   initialState,
//   reducers: {
//     // 1️⃣ Add item to trash
//     addEmployeeToTrash: (state, action) => {
//       state.employees.push(action.payload);
//       localStorage.setItem("trash", JSON.stringify(state));
//     },

//     // 2️⃣ Remove item from trash (permanent delete)
//     removeEmployeeFromTrash: (state, action) => {
//       state.employees = state.employees.filter(
//         (emp) => emp.id !== action.payload
//       );
//       localStorage.setItem("trash", JSON.stringify(state));
//     },

//     // 3️⃣ Restore employee (remove from trash)
//     restoreEmployeeFromTrash: (state, action) => {
//       state.employees = state.employees.filter(
//         (emp) => emp.id !== action.payload
//       );
//       localStorage.setItem("trash", JSON.stringify(state));
//     },

//     // 4️⃣ Auto cleanup (24 hours)
//     cleanupExpiredEmployees: (state) => {
//       const now = Date.now();
//       const DAY = 24 * 60 * 60 * 1000;

//       state.employees = state.employees.filter(
//         (emp) => now - emp.deletedAt < DAY
//       );
     
//       localStorage.setItem("trash", JSON.stringify(state));
//       // 🟦 PROJECT TRASH

// addProjectToTrash: (state, action) => {
//   state.projects.push(action.payload);
//   localStorage.setItem("trash", JSON.stringify(state));
// },

// removeProjectFromTrash: (state, action) => {
//   state.projects = state.projects.filter(
//     (project) => project.id !== action.payload
//   );
//   localStorage.setItem("trash", JSON.stringify(state));
// },

// restoreProjectFromTrash: (state, action) => {
//   state.projects = state.projects.filter(
//     (project) => project.id !== action.payload
//   );
//   localStorage.setItem("trash", JSON.stringify(state));
// },

// cleanupExpiredProjects: (state) => {
//   const now = Date.now();
//   const DAY = 24 * 60 * 60 * 1000;

//   state.projects = state.projects.filter(
//     (project) => now - project.deletedAt < DAY
//   );

//   localStorage.setItem("trash", JSON.stringify(state));
// },

//     },
//   },
// });

// // export const {
// //   addEmployeeToTrash,
// //   removeEmployeeFromTrash,
// //   restoreEmployeeFromTrash,
// //   cleanupExpiredEmployees,
// // } = trashSlice.actions;

// export const {
//   addEmployeeToTrash,
//   removeEmployeeFromTrash,
//   restoreEmployeeFromTrash,
//   cleanupExpiredEmployees,

//   addProjectToTrash,
//   removeProjectFromTrash,
//   restoreProjectFromTrash,
//   cleanupExpiredProjects,
// } = trashSlice.actions;


// export default trashSlice.reducer;

// verssion two




import { createSlice } from "@reduxjs/toolkit";

// Load trash from localStorage
const loadTrash = () => {
  const data = localStorage.getItem("trash");
  return data ? JSON.parse(data) : { employees: [], projects: [] };
};

const initialState = loadTrash();

const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
    // 🧑 EMPLOYEES
    addEmployeeToTrash: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem("trash", JSON.stringify(state));
    },

    removeEmployeeFromTrash: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      localStorage.setItem("trash", JSON.stringify(state));
    },

    restoreEmployeeFromTrash: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      localStorage.setItem("trash", JSON.stringify(state));
    },

    cleanupExpiredEmployees: (state) => {
      const now = Date.now();
      const DAY = 24 * 60 * 60 * 1000;

      state.employees = state.employees.filter(
        (emp) => now - emp.deletedAt < DAY
      );

      localStorage.setItem("trash", JSON.stringify(state));
    },

    // 📦 PROJECTS
    addProjectToTrash: (state, action) => {
      state.projects.push(action.payload);
      localStorage.setItem("trash", JSON.stringify(state));
    },

    removeProjectFromTrash: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      localStorage.setItem("trash", JSON.stringify(state));
    },

    restoreProjectFromTrash: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      localStorage.setItem("trash", JSON.stringify(state));
    },

    cleanupExpiredProjects: (state) => {
      const now = Date.now();
      const DAY = 24 * 60 * 60 * 1000;

      state.projects = state.projects.filter(
        (project) => now - project.deletedAt < DAY
      );

      localStorage.setItem("trash", JSON.stringify(state));
    },
  },
});

export const {
  addEmployeeToTrash,
  removeEmployeeFromTrash,
  restoreEmployeeFromTrash,
  cleanupExpiredEmployees,

  addProjectToTrash,
  removeProjectFromTrash,
  restoreProjectFromTrash,
  cleanupExpiredProjects,
} = trashSlice.actions;

export default trashSlice.reducer;

