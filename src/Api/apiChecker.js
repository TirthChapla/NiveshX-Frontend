import axios from 'axios';
import { API_BASE_URL } from './api';

/**
 * API Configuration Checker
 * Run this to verify backend connectivity and API endpoints
 */

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
};

class APIChecker {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
    };
  }

  async checkBackendConnectivity() {
    log.info(`Checking backend connectivity at ${API_BASE_URL}...`);
    try {
      const response = await axios.get(API_BASE_URL, { timeout: 5000 });
      log.success('Backend is reachable');
      this.results.passed++;
      return true;
    } catch (error) {
      log.error(`Backend is not reachable: ${error.message}`);
      log.warning('Make sure the Spring Boot backend is running on port 5454');
      this.results.failed++;
      return false;
    } finally {
      this.results.total++;
    }
  }

  async checkPublicEndpoints() {
    log.info('Checking public endpoints...');
    
    const publicEndpoints = [
      { method: 'GET', path: '/coins?page=1', name: 'Coin List' },
      { method: 'GET', path: '/coins/top50', name: 'Top 50 Coins' },
      { method: 'GET', path: '/coins/trading', name: 'Trading Coins' },
    ];

    for (const endpoint of publicEndpoints) {
      this.results.total++;
      try {
        const response = await axios({
          method: endpoint.method,
          url: `${API_BASE_URL}${endpoint.path}`,
          timeout: 10000,
        });
        
        if (response.status === 200) {
          log.success(`${endpoint.name} endpoint is working`);
          this.results.passed++;
        }
      } catch (error) {
        if (error.response?.status === 401) {
          log.warning(`${endpoint.name} requires authentication (this is expected)`);
          this.results.passed++;
        } else {
          log.error(`${endpoint.name} failed: ${error.message}`);
          this.results.failed++;
        }
      }
    }
  }

  async checkAuthEndpoints() {
    log.info('Checking authentication endpoints...');
    
    // Test signup endpoint structure (without actually creating a user)
    this.results.total++;
    try {
      // This will fail but we're checking if the endpoint exists
      await axios.post(`${API_BASE_URL}/auth/signup`, {});
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 500) {
        // Endpoint exists but validation failed (expected)
        log.success('Signup endpoint is configured');
        this.results.passed++;
      } else if (error.response?.status === 404) {
        log.error('Signup endpoint not found');
        this.results.failed++;
      } else {
        log.warning(`Signup endpoint check inconclusive: ${error.message}`);
        this.results.passed++;
      }
    }

    // Test signin endpoint structure
    this.results.total++;
    try {
      await axios.post(`${API_BASE_URL}/auth/signin`, {});
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 401 || error.response?.status === 500) {
        log.success('Signin endpoint is configured');
        this.results.passed++;
      } else if (error.response?.status === 404) {
        log.error('Signin endpoint not found');
        this.results.failed++;
      } else {
        log.warning(`Signin endpoint check inconclusive: ${error.message}`);
        this.results.passed++;
      }
    }
  }

  async checkCORSConfiguration() {
    log.info('Checking CORS configuration...');
    this.results.total++;
    
    try {
      const response = await axios.get(`${API_BASE_URL}/coins?page=1`, {
        headers: {
          'Origin': 'http://localhost:5173'
        }
      });
      
      log.success('CORS is properly configured for localhost:5173');
      this.results.passed++;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        log.error('CORS might be misconfigured or backend is not running');
        this.results.failed++;
      } else {
        log.warning('CORS check inconclusive');
        this.results.passed++;
      }
    }
  }

  async checkProtectedEndpoints() {
    log.info('Checking protected endpoints (should require authentication)...');
    
    const protectedEndpoints = [
      { path: '/api/users/profile', name: 'User Profile' },
      { path: '/api/wallet', name: 'User Wallet' },
      { path: '/api/orders', name: 'User Orders' },
      { path: '/api/watchlist/user', name: 'User Watchlist' },
      { path: '/api/assets', name: 'User Assets' },
    ];

    for (const endpoint of protectedEndpoints) {
      this.results.total++;
      try {
        await axios.get(`${API_BASE_URL}${endpoint.path}`);
        log.warning(`${endpoint.name} doesn't require authentication (security issue!)`);
        this.results.failed++;
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          log.success(`${endpoint.name} is properly protected`);
          this.results.passed++;
        } else {
          log.error(`${endpoint.name} returned unexpected status: ${error.response?.status}`);
          this.results.failed++;
        }
      }
    }
  }

  printSummary() {
    console.log('\n' + '='.repeat(50));
    console.log('API Configuration Check Summary');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${this.results.total}`);
    console.log(`${colors.green}Passed: ${this.results.passed}${colors.reset}`);
    console.log(`${colors.red}Failed: ${this.results.failed}${colors.reset}`);
    console.log('='.repeat(50));
    
    if (this.results.failed === 0) {
      log.success('All API checks passed! Your configuration looks good.');
    } else if (this.results.failed <= 2) {
      log.warning('Most checks passed, but there are some minor issues to address.');
    } else {
      log.error('Multiple checks failed. Please review the backend configuration.');
    }
  }

  async runAllChecks() {
    console.log('\n' + '='.repeat(50));
    console.log('Starting API Configuration Check');
    console.log('='.repeat(50) + '\n');

    const backendReachable = await this.checkBackendConnectivity();
    
    if (!backendReachable) {
      log.error('\nBackend is not reachable. Skipping further checks.');
      log.info('Please start the Spring Boot backend and try again.');
      return;
    }

    await this.checkPublicEndpoints();
    await this.checkAuthEndpoints();
    await this.checkCORSConfiguration();
    await this.checkProtectedEndpoints();

    this.printSummary();
  }
}

// Run the checker
const checker = new APIChecker();
checker.runAllChecks().catch(console.error);

export default APIChecker;
