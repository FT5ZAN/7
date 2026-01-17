

import styles from "../Styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { CompanynameContext } from "../Context/UsernameContext";
import { useContext, useEffect } from "react";

import OverView from "../Components/Dashbord.com/OverView.jsx";

// icons
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { FaCalendarCheck } from "react-icons/fa";

function Dashboard({ user, loading }) {
  const navigate = useNavigate();
  const CompanyName = useContext(CompanynameContext);

  // ✅ MOVE NAVIGATION INTO useEffect
  useEffect(() => {
    if (!loading && !user) {
      navigate("/Auth");
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dfit}>
        <h1 className={styles.companyName}>{CompanyName}</h1>

        <div className={styles.displayCrdsSection}>
          <div className={styles.StatusCards}>
            <div className={styles.employ}>
              <h1 className={styles.Aemployees}>Active Employees</h1>
              <p className={styles.Avalue}>50</p>
              <h2 className={styles.Temployees}>Total Employees</h2>
              <p className={styles.Tvalue}>100</p>
            </div>
            <div className={styles.Icons}>
              <CgProfile />
            </div>
          </div>

          <div className={styles.StatusCards}>
            <div className={styles.employ}>
              <h1 className={styles.Aemployees}>Active Projects</h1>
              <p className={styles.Avalue}>20</p>
              <h2 className={styles.Temployees}>Active Employee In Projects</h2>
              <p className={styles.Tvalue}>60</p>
            </div>
            <div className={styles.Icons}>
              <GrProjects />
            </div>
          </div>

          <div className={styles.StatusCards}>
            <div className={styles.employ}>
              <h1 className={styles.Aemployees}>Finished Projects</h1>
              <p className={styles.Avalue}>120</p>
              <h2 className={styles.Temployees}>Happy Clients</h2>
              <p className={styles.Tvalue}>100</p>
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
