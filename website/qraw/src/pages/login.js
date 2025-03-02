import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './auth.module.css';

export default function Login() {
  const [isWeb3Login, setIsWeb3Login] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTraditionalLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, just redirect to home
      window.location.href = '/';
    }, 1500);
  };

  const handleWeb3Login = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('No Web3 wallet detected. Please install MetaMask or another Web3 wallet.');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      // For demo purposes, just show success and redirect
      console.log('Connected with account:', account);
      
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="Login | Zyptal"
      description="Log in to your Zyptal account">
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1>Login to Zyptal</h1>
            <p>Access your dashboard and manage your API usage</p>
          </div>

          <div className={styles.authTabs}>
            <button 
              className={`${styles.authTab} ${!isWeb3Login ? styles.authTabActive : ''}`}
              onClick={() => setIsWeb3Login(false)}>
              Email Login
            </button>
            <button 
              className={`${styles.authTab} ${isWeb3Login ? styles.authTabActive : ''}`}
              onClick={() => setIsWeb3Login(true)}>
              Web3 Login
            </button>
          </div>

          {error && (
            <div className={styles.authError}>
              {error}
            </div>
          )}

          {!isWeb3Login ? (
            <form className={styles.authForm} onSubmit={handleTraditionalLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className={styles.formActions}>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className={styles.authButton}
                disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <div className={styles.web3Container}>
              <div className={styles.walletInfo}>
                <div className={styles.walletIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 7h-1V6A3 3 0 0 0 15 3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3z"></path>
                    <line x1="16" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <p>Connect your Web3 wallet to login securely without a password</p>
              </div>
              
              <button 
                className={styles.walletButton}
                onClick={handleWeb3Login}
                disabled={isLoading}>
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
              
              <div className={styles.supportedWallets}>
                <p>Supported wallets:</p>
                <div className={styles.walletLogos}>
                  <div className={styles.walletLogo} title="MetaMask">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 212 189">
                      <g fill="none" fillRule="evenodd">
                        <path fill="#CDBDB2" d="M60.75 173.25L88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875z"/>
                        <path fill="#CDBDB2" d="M105.75 173.25L132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875z" transform="matrix(-1 0 0 1 256.5 0)"/>
                        <path fill="#393939" d="M90.563 152.438L88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188z"/>
                        <path fill="#F89C35" d="M75.375 27L88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27z"/>
                        <path fill="#F89D35" d="M16.313 96.188L0.563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813z"/>
                        <path fill="#D87C30" d="M46.125 101.25L92.25 102.375 87.188 126 65.25 120.375z"/>
                        <path fill="#EA8D3A" d="M46.125 101.813L65.25 119.813 65.25 137.813z"/>
                        <path fill="#F89D35" d="M65.25 120.375L87.75 126 95.063 150.188 90 153 65.25 138.375z"/>
                        <path fill="#EB8F35" d="M65.25 138.375L60.75 173.25 90.563 152.438z"/>
                        <path fill="#EA8E3A" d="M92.25 102.375L95.063 150.188 86.625 125.719z"/>
                        <path fill="#D87C30" d="M39.375 138.938L65.25 138.375 60.75 173.25z"/>
                        <path fill="#EB8F35" d="M12.938 188.438L60.75 173.25 39.375 138.938 0.563 141.75z"/>
                        <path fill="#E8821E" d="M88.875 58.5L64.688 78.75 46.125 101.25 92.25 102.938z"/>
                        <path fill="#DFCEC3" d="M60.75 173.25L90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625z"/>
                        <path fill="#DFCEC3" d="M121.5 173.25L150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625z" transform="matrix(-1 0 0 1 272.25 0)"/>
                        <path fill="#393939" d="M70.313 112.5L64.125 125.438 86.063 119.813z" transform="matrix(-1 0 0 1 150.188 0)"/>
                        <path fill="#E88F35" d="M12.375 .563L88.875 58.5 75.938 27z"/>
                        <path fill="#8E5A30" d="M12.375 .563L2.25 31.5 7.875 65.25 3.375 67.5 9 72.563 4.5 76.5 10.688 82.125 6.75 85.5 15.75 96.75 58.5 83.813 88.875 58.5z"/>
                        <path fill="#F89D35" d="M195.75 96.188L211.5 141.75 172.125 139.5 146.813 139.5 146.813 119.813 147.938 79.313 153.563 83.813z"/>
                        <path fill="#D87C30" d="M165.938 101.25L119.813 102.375 124.875 126 146.813 120.375z"/>
                        <path fill="#EA8D3A" d="M165.938 101.813L146.813 119.813 146.813 137.813z"/>
                        <path fill="#F89D35" d="M146.813 120.375L124.313 126 117 150.188 122.063 153 146.813 138.375z"/>
                        <path fill="#EB8F35" d="M146.813 138.375L151.313 173.25 121.5 152.438z"/>
                        <path fill="#EA8E3A" d="M119.813 102.375L117 150.188 125.438 125.719z"/>
                        <path fill="#D87C30" d="M172.688 138.938L146.813 138.375 151.313 173.25z"/>
                        <path fill="#EB8F35" d="M199.125 188.438L151.313 173.25 172.688 138.938 211.5 141.75z"/>
                        <path fill="#E8821E" d="M123.188 58.5L147.375 78.75 165.938 101.25 119.813 102.938z"/>
                        <path fill="#393939" d="M141.75 112.5L147.938 125.438 126 119.813z"/>
                        <path fill="#E88F35" d="M199.688 .563L123.188 58.5 136.125 27z"/>
                        <path fill="#8E5A30" d="M199.688 .563L209.813 31.5 204.188 65.25 208.688 67.5 203.063 72.563 207.563 76.5 201.375 82.125 205.313 85.5 196.313 96.75 153.563 83.813 123.188 58.5z"/>
                      </g>
                    </svg>
                  </div>
                  <div className={styles.walletLogo} title="WalletConnect">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.58818 11.8556C13.1293 8.31442 18.8706 8.31442 22.4117 11.8556L22.8379 12.2818C23.015 12.4588 23.015 12.7459 22.8379 12.9229L21.3801 14.3808C21.2915 14.4693 21.148 14.4693 21.0595 14.3808L20.473 13.7943C18.0026 11.3239 13.9973 11.3239 11.5269 13.7943L10.8989 14.4223C10.8104 14.5109 10.6668 14.5109 10.5783 14.4223L9.12041 12.9645C8.94336 12.7875 8.94336 12.5004 9.12041 12.3234L9.58818 11.8556ZM25.4268 14.8706L26.7243 16.1682C26.9013 16.3452 26.9013 16.6323 26.7243 16.8093L20.8737 22.6599C20.6966 22.8369 20.4096 22.8369 20.2325 22.6599L16.1213 18.5487C16.0771 18.5044 16.0037 18.5044 15.9594 18.5487L11.8482 22.6599C11.6712 22.8369 11.3841 22.8369 11.2071 22.6599L5.3565 16.8093C5.17945 16.6323 5.17945 16.3452 5.3565 16.1682L6.65396 14.8706C6.83101 14.6936 7.11803 14.6936 7.29508 14.8706L11.4063 18.9819C11.4506 19.0262 11.524 19.0262 11.5683 18.9819L15.6795 14.8706C15.8566 14.6936 16.1436 14.6936 16.3206 14.8706L20.4318 18.9819C20.4761 19.0262 20.5495 19.0262 20.5938 18.9819L24.705 14.8706C24.882 14.6936 25.1691 14.6936 25.3461 14.8706H25.4268Z" fill="#3B99FC"/>
                    </svg>
                  </div>
                  <div className={styles.walletLogo} title="Coinbase Wallet">
                    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#1652F0"/>
                      <path d="M20.0001 6.09375C12.2642 6.09375 6.0001 12.3578 6.0001 20.0938C6.0001 27.8297 12.2642 34.0938 20.0001 34.0938C27.736 34.0938 34.0001 27.8297 34.0001 20.0938C34.0001 12.3578 27.736 6.09375 20.0001 6.09375ZM16.9798 14.7078C17.3765 14.3109 17.9876 14.3109 18.3845 14.7078L20.0001 16.3234L21.6158 14.7078C22.0127 14.3109 22.6238 14.3109 23.0205 14.7078C23.4173 15.1047 23.4173 15.7156 23.0205 16.1125L21.4048 17.7281L23.0205 19.3438C23.4173 19.7406 23.4173 20.3516 23.0205 20.7484C22.6238 21.1453 22.0127 21.1453 21.6158 20.7484L20.0001 19.1328L18.3845 20.7484C17.9876 21.1453 17.3765 21.1453 16.9798 20.7484C16.583 20.3516 16.583 19.7406 16.9798 19.3438L18.5954 17.7281L16.9798 16.1125C16.583 15.7156 16.583 15.1047 16.9798 14.7078ZM26.5517 26.5453C26.1548 26.9422 25.5438 26.9422 25.147 26.5453L23.5314 24.9297L21.9158 26.5453C21.5189 26.9422 20.9079 26.9422 20.5111 26.5453C20.1142 26.1484 20.1142 25.5375 20.5111 25.1406L22.1267 23.525L20.5111 21.9094C20.1142 21.5125 20.1142 20.9016 20.5111 20.5047C20.9079 20.1078 21.5189 20.1078 21.9158 20.5047L23.5314 22.1203L25.147 20.5047C25.5438 20.1078 26.1548 20.1078 26.5517 20.5047C26.9486 20.9016 26.9486 21.5125 26.5517 21.9094L24.9361 23.525L26.5517 25.1406C26.9486 25.5375 26.9486 26.1484 26.5517 26.5453ZM14.8892 26.5453C14.4923 26.9422 13.8814 26.9422 13.4845 26.5453C13.0876 26.1484 13.0876 25.5375 13.4845 25.1406L15.1001 23.525L13.4845 21.9094C13.0876 21.5125 13.0876 20.9016 13.4845 20.5047C13.8814 20.1078 14.4923 20.1078 14.8892 20.5047L16.5048 22.1203L18.1204 20.5047C18.5173 20.1078 19.1282 20.1078 19.5251 20.5047C19.922 20.9016 19.922 21.5125 19.5251 21.9094L17.9095 23.525L19.5251 25.1406C19.922 25.5375 19.922 26.1484 19.5251 26.5453C19.1282 26.9422 18.5173 26.9422 18.1204 26.5453L16.5048 24.9297L14.8892 26.5453Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className={styles.authFooter}>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 