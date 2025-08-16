// Debug script to test the API endpoint
const https = require('https');

const API_URL = "https://crop-disease-detection-api-0spd.onrender.com/api/upload";

function testAPIEndpoint() {
  return new Promise((resolve, reject) => {
    const req = https.get(API_URL, (res) => {
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

