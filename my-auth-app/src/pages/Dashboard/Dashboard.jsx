import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 
import styles from "./Dashboard.module.css"; 

export default function Dashboard() {
  const { userQuery, logoutMutation } = useAuth();
  const navigate = useNavigate();

  if (!userQuery.data && !userQuery.isLoading && !localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />
  }

  if (userQuery.isLoading) {
    return <div className={styles.loadingText}>Loading...</div>;
  }
  
  const user = userQuery.data?.data || {};

  const handleLogout = () => {
      logoutMutation.mutate(null, {
          onSuccess: () => {
              navigate("/login");
          }
      });
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>MyAuth App</div>
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className={`${styles.button} ${styles.logoutButton}`}
        >
          {logoutMutation.isPending ? "Exiting..." : "Sign Out"}
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
          <h2 className={styles.welcomeText}>
            Welcome, <span className={styles.highlight}>{user.name || "User"}</span>!
          </h2>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>EMAIL:</span>
              <span className={styles.value}>{user.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>ID:</span>
              <span className={styles.value}>{user.id}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}