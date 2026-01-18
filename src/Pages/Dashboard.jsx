

// import styles from "../Styles/Dashboard.module.css";
// import { useNavigate } from "react-router-dom";
// import { CompanynameContext } from "../Context/UsernameContext";
// import { useContext, useEffect } from "react";

// import OverView from "../Components/Dashbord.com/OverView.jsx";

// // icons
// import { CgProfile } from "react-icons/cg";
// import { GrProjects } from "react-icons/gr";
// import { FaCalendarCheck } from "react-icons/fa";

// function Dashboard({ user, loading }) {
//   const navigate = useNavigate();
//   const CompanyName = useContext(CompanynameContext);

//   // ✅ MOVE NAVIGATION INTO useEffect
//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/Auth");
//     }
//   }, [user, loading, navigate]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.Dashboard}>
//       <div className={styles.Dfit}>
//         <h1 className={styles.companyName}>{CompanyName}</h1>

//         <div className={styles.displayCrdsSection}>
//           <div className={styles.StatusCards}>
//             <div className={styles.employ}>
//               <h1 className={styles.Aemployees}>Active Employees</h1>
//               <p className={styles.Avalue}>50</p>
//               <h2 className={styles.Temployees}>Total Employees</h2>
//               <p className={styles.Tvalue}>100</p>
//             </div>
//             <div className={styles.Icons}>
//               <CgProfile />
//             </div>
//           </div>

//           <div className={styles.StatusCards}>
//             <div className={styles.employ}>
//               <h1 className={styles.Aemployees}>Active Projects</h1>
//               <p className={styles.Avalue}>20</p>
//               <h2 className={styles.Temployees}>Active Employee In Projects</h2>
//               <p className={styles.Tvalue}>60</p>
//             </div>
//             <div className={styles.Icons}>
//               <GrProjects />
//             </div>
//           </div>

//           <div className={styles.StatusCards}>
//             <div className={styles.employ}>
//               <h1 className={styles.Aemployees}>Finished Projects</h1>
//               <p className={styles.Avalue}>120</p>
//               <h2 className={styles.Temployees}>Hold projects</h2>
//               <p className={styles.Tvalue}>100</p>
//             </div>
//             <div className={styles.Icons}>
//               <FaCalendarCheck />
//             </div>
//           </div>
//         </div>

//         <div className={styles.OverView}>
//           <OverView />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;





import styles from "../Styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { CompanynameContext } from "../Context/UsernameContext";
import { useContext, useEffect, useState } from "react";

import OverView from "../Components/Dashbord.com/OverView.jsx";
import { getCompanyById } from "../Api/Api_Methods.jsx";

// icons
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { FaCalendarCheck } from "react-icons/fa";

function Dashboard({ user, loading }) {
  const navigate = useNavigate();
  const CompanyName = useContext(CompanynameContext);

  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  // 🔐 Auth protection
  useEffect(() => {
    if (!loading && !user) {
      navigate("/Auth");
    }
  }, [user, loading, navigate]);

  // 📊 Fetch dashboard data
  useEffect(() => {
    async function fetchDashboardData() {
      const companyId = localStorage.getItem("userId");
      if (!companyId) return;

      const res = await getCompanyById(companyId);
      setEmployees(res.data.employees || []);
      setProjects(res.data.projects || []);
    }

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;

  // 👤 EMPLOYEES
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (e) => e.status === "active"
  ).length;

  // 📁 PROJECTS
  const activeProjects = projects.filter(
    (p) => p.status === "in-progress"
  ).length;

  const finishedProjects = projects.filter(
    (p) => p.status === "completed"
  ).length;

  const holdProjects = projects.filter(
    (p) => p.status === "on-hold"
  ).length;

  // 👥 ACTIVE EMPLOYEES IN PROJECTS (unique)
  const activeEmployeesInProjects = new Set(
    projects.flatMap((p) =>
      (p.teamMembers || []).map((m) => m.id)
    )
  ).size;

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dfit}>
        <h1 className={styles.companyName}>{CompanyName}</h1>

        <div className={styles.displayCrdsSection}>
          {/* EMPLOYEES CARD */}
          <div className={styles.StatusCards}>
            <div className={styles.employ}>
              <h1 className={styles.Aemployees}>Active Employees</h1>
              <p className={styles.Avalue}>{activeEmployees}</p>

              <h2 className={styles.Temployees}>Total Employees</h2>
              <p className={styles.Tvalue}>{totalEmployees}</p>
            </div>
            <div className={styles.Icons}>
              <CgProfile />
            </div>
          </div>

          {/* PROJECTS CARD */}
          <div className={styles.StatusCards}>
            <div className={styles.employ}>
              <h1 className={styles.Aemployees}>Active Projects</h1>
              <p className={styles.Avalue}>{activeProjects}</p>

              <h2 className={styles.Temployees}>
                Active Employees In Projects
              </h2>
              <p className={styles.Tvalue}>
                {activeEmployeesInProjects}
              </p>
            </div>
            <div className={styles.Icons}>
              <GrProjects />
            </div>
          </div>

          {/* FINISHED / HOLD CARD */}
          <div className={styles.StatusCards}>
            <div className={styles.employ}>
              <h1 className={styles.Aemployees}>Finished Projects</h1>
              <p className={styles.Avalue}>{finishedProjects}</p>

              <h2 className={styles.Temployees}>Hold Projects</h2>
              <p className={styles.Tvalue}>{holdProjects}</p>
            </div>
            <div className={styles.Icons}>
              <FaCalendarCheck />
            </div>
          </div>
        </div>

        <div className={styles.OverView}>
          <OverView />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
