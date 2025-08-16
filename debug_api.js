// Debug script to test the API endpoint
const https = require('https');

// Get API URL from environment variable
const API_URL = process.env.VITE_PEST_DISEASE_API_URL || process.env.PEST_DISEASE_API_URL;

if (!API_URL) {
  console.error('❌ API URL not configured. Please set VITE_PEST_DISEASE_API_URL or PEST_DISEASE_API_URL environment variable.');
  process.exit(1);
}

const FULL_API_URL = `${API_URL}/api/upload`;

function testAPIEndpoint() {
  return new Promise((resolve, reject) => {
    const req = https.get(FULL_API_URL, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('Response:', data);
        resolve(res.statusCode);
      });
    });
    
    req.on('error', (err) => {
      console.error('Error:', err.message);
      reject(err);
    });
    
    req.end();
  });
}

async function main() {
  console.log('🔍 Testing API endpoint...');
  try {
    const status = await testAPIEndpoint();
    console.log(`\nAPI returned status: ${status}`);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

main();

