import React from "react"; import Link from "@docusaurus/Link"; import styles from "./styles.module.css"; export default function DashboardButton() { return ( <div className={styles.dashboardButtonContainer}><Link className={styles.dashboardButton} to="/try-dashboard"><span className={styles.dashboardButtonIcon}>🚀</span><span className={styles.dashboardButtonText}>Try Dashboard</span></Link></div> ); }
 