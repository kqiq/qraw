import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import styles from "./dashboard.module.css";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState('sk_test_51NXhT7JqmI9Xq4Ks8hL2vPjMa6Fz0gBw3');
  const [copySuccess, setCopySuccess] = useState(false);

  const {isDarkTheme} = useDocusaurusContext();

  useEffect(() => {
    setIsDarkMode(isDarkTheme);
  }, [isDarkTheme]);

  const handleRunTest = () => {
    setIsLoading(true);
    setResponseData(null);
    
    // Simulate API call
    setTimeout(() => {
      setResponseData({
        success: true,
        data: {
          result: "Success",
          message: "API request completed successfully",
          timestamp: new Date().toISOString(),
          request_id: "req_" + Math.random().toString(36).substring(2, 12)
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Layout title="Dashboard">
      <div className={`${styles.dashboardWrapper} ${isDarkMode ? styles.darkMode : ''}`}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>D</div>
            <div className={styles.logoText}>Dashboard</div>
          </div>
          
          <div className={styles.sidebarNav}>
            <button 
              className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className={styles.navIcon}>📊</span>
              <span>Overview</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activeTab === 'playground' ? styles.active : ''}`}
              onClick={() => setActiveTab('playground')}
            >
              <span className={styles.navIcon}>🧪</span>
              <span>API Playground</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className={styles.navIcon}>⚙️</span>
              <span>Settings</span>
            </button>
          </div>
          
          <div className={styles.planInfo}>
            <div className={styles.planBadge}>Pro Plan</div>
            <div className={styles.usageInfo}>
              <div className={styles.usageLabel}>API Usage (This Month)</div>
              <div className={styles.usageBar}>
                <div className={styles.usageProgress} style={{ width: '65%' }}></div>
              </div>
              <div className={styles.usageText}>65,000 / 100,000 requests</div>
            </div>
          </div>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.dashboardHeader}>
            <h1>Dashboard</h1>
            <div className={styles.userInfo}>
              <div className={styles.welcomeText}>Welcome back, Developer</div>
              <div className={styles.userAvatar}>D</div>
            </div>
          </div>
          
          <div className={styles.contentArea}>
            {activeTab === 'overview' && (
              <div className={styles.overviewTab}>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>📈</div>
                    <div className={styles.statInfo}>
                      <div className={styles.statValue}>65,432</div>
                      <div className={styles.statLabel}>Total API Calls</div>
                    </div>
                  </div>
                  
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>⚡</div>
                    <div className={styles.statInfo}>
                      <div className={styles.statValue}>124ms</div>
                      <div className={styles.statLabel}>Average Response Time</div>
                    </div>
                  </div>
                  
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>✅</div>
                    <div className={styles.statInfo}>
                      <div className={styles.statValue}>99.8%</div>
                      <div className={styles.statLabel}>Success Rate</div>
                    </div>
                  </div>
                  
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>🔑</div>
                    <div className={styles.statInfo}>
                      <div className={styles.statValue}>3</div>
                      <div className={styles.statLabel}>Active API Keys</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.apiKeySection}>
                  <div className={styles.sectionHeader}>
                    <h2>Your API Key</h2>
                    <button className={styles.refreshButton}>
                      <span className={styles.buttonIcon}>🔄</span> Refresh Key
                    </button>
                  </div>
                  
                  <div className={styles.apiKeyDisplay}>
                    <code>{apiKey}</code>
                    <button className={styles.copyButton} onClick={handleCopyApiKey}>
                      {copySuccess ? '✅ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                  
                  <p className={styles.apiKeyInfo}>
                    This key gives access to all API endpoints. Keep it secure and never share it publicly.
                  </p>
                </div>
                
                <div className={styles.recentActivity}>
                  <div className={styles.sectionHeader}>
                    <h2>Recent Activity</h2>
                    <button className={styles.viewAllButton}>View All</button>
                  </div>
                  
                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon}>🔍</div>
                      <div className={styles.activityInfo}>
                        <div className={styles.activityTitle}>API Key Created</div>
                        <div className={styles.activityTime}>Today, 10:23 AM</div>
                      </div>
                    </div>
                    
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon}>📊</div>
                      <div className={styles.activityInfo}>
                        <div className={styles.activityTitle}>Rate Limit Increased</div>
                        <div className={styles.activityTime}>Yesterday, 2:45 PM</div>
                      </div>
                    </div>
                    
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon}>⚠️</div>
                      <div className={styles.activityInfo}>
                        <div className={styles.activityTitle}>Usage Spike Detected</div>
                        <div className={styles.activityTime}>Mar 12, 8:30 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'playground' && (
              <div className={styles.playgroundTab}>
                <div className={styles.sectionHeader}>
                  <h2>API Playground</h2>
                  <div className={styles.playgroundActions}>
                    <button className={styles.actionButton}>Save Request</button>
                  </div>
                </div>
                
                <p className={styles.sectionDescription}>
                  Test your API endpoints and see the responses in real-time.
                </p>
                
                <div className={styles.playgroundForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="endpoint">Endpoint</label>
                      <select id="endpoint" className={styles.formControl}>
                        <option value="/api/v1/data">GET /api/v1/data</option>
                        <option value="/api/v1/analyze">POST /api/v1/analyze</option>
                        <option value="/api/v1/process">PUT /api/v1/process</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="method">Method</label>
                      <select id="method" className={styles.formControl}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="params">Parameters (JSON)</label>
                    <textarea 
                      id="params" 
                      className={styles.formControl} 
                      rows="5"
                      placeholder='{"query": "example", "limit": 10}'
                    ></textarea>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="headers">Headers (Optional)</label>
                    <textarea 
                      id="headers" 
                      className={styles.formControl} 
                      rows="3"
                      placeholder='{"Content-Type": "application/json"}'
                    ></textarea>
                  </div>
                  
                  <button 
                    className={styles.runButton} 
                    onClick={handleRunTest}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className={styles.spinnerSmall}></div>
                        Running...
                      </>
                    ) : (
                      'Run Test'
                    )}
                  </button>
                </div>
                
                {(isLoading || responseData) && (
                  <div className={styles.responseSection}>
                    <div className={styles.responseHeader}>
                      <h3>Response</h3>
                      <div className={styles.responseMeta}>
                        {responseData && (
                          <>
                            <div className={styles.statusBadge}>200 OK</div>
                            <div className={styles.timeBadge}>124ms</div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {isLoading ? (
                      <div className={styles.loadingIndicator}>
                        <div className={styles.spinner}></div>
                        <div>Processing request...</div>
                      </div>
                    ) : (
                      <div className={styles.responseBody}>
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className={styles.settingsTab}>
                <div className={styles.settingsSection}>
                  <h3>Account Settings</h3>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Display Name</label>
                    <input type="text" id="name" className={styles.formControl} defaultValue="Developer" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" className={styles.formControl} defaultValue="developer@example.com" />
                  </div>
                  
                  <button className={styles.saveButton}>Save Changes</button>
                </div>
                
                <div className={styles.settingsSection}>
                  <h3>Notification Preferences</h3>
                  
                  <div className={styles.checkboxGroup}>
                    <input type="checkbox" id="email_notifications" defaultChecked />
                    <label htmlFor="email_notifications">Email notifications for important alerts</label>
                  </div>
                  
                  <div className={styles.checkboxGroup}>
                    <input type="checkbox" id="usage_alerts" defaultChecked />
                    <label htmlFor="usage_alerts">Usage threshold alerts (80% of limit)</label>
                  </div>
                  
                  <div className={styles.checkboxGroup}>
                    <input type="checkbox" id="newsletter" />
                    <label htmlFor="newsletter">Product updates and newsletter</label>
                  </div>
                  
                  <button className={styles.saveButton}>Save Preferences</button>
                </div>
                
                <div className={styles.settingsSection}>
                  <h3>API Rate Limits</h3>
                  
                  <div className={styles.rateLimitInfo}>
                    <div className={styles.rateLimitItem}>
                      <span className={styles.rateLimitLabel}>Current Plan:</span>
                      <span className={styles.rateLimitValue}>Pro</span>
                    </div>
                    
                    <div className={styles.rateLimitItem}>
                      <span className={styles.rateLimitLabel}>Requests per minute:</span>
                      <span className={styles.rateLimitValue}>60</span>
                    </div>
                    
                    <div className={styles.rateLimitItem}>
                      <span className={styles.rateLimitLabel}>Requests per day:</span>
                      <span className={styles.rateLimitValue}>10,000</span>
                    </div>
                    
                    <div className={styles.rateLimitItem}>
                      <span className={styles.rateLimitLabel}>Requests per month:</span>
                      <span className={styles.rateLimitValue}>100,000</span>
                    </div>
                  </div>
                  
                  <button className={styles.upgradeButton}>Upgrade Plan</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
 