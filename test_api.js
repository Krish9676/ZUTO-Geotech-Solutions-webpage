// Simple API test script to verify the endpoint is working
const https = require('https');

const API_BASE_URL = "https://crop-disease-detection-api-0spd.onrender.com";

function testHealthCheck() {
  return new Promise((resolve, reject) => {
    const req = https.get(`${API_BASE_URL}/`, (res) => {
      console.log(`✅ Health Check: ${res.statusCode}`);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('Response:', jsonData);
          resolve(res.statusCode === 200);
        } catch (e) {
          console.log('Response (raw):', data);
          resolve(res.statusCode === 200);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Health Check Failed: ${err.message}`);
      reject(err);
    });
    
    req.end();
  });
}

function testApiDocs() {
  return new Promise((resolve, reject) => {
    const req = https.get(`${API_BASE_URL}/docs`, (res) => {
      console.log(`✅ API Docs: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    });
    
    req.on('error', (err) => {
      console.log(`❌ API Docs Failed: ${err.message}`);
      reject(err);
    });
    
    req.end();
  });
}

async function main() {
  console.log('🚀 Testing Crop Disease Detection API');
  console.log('=' * 50);

  try {
    // Test 1: Health Check
    console.log('\n1️⃣ Testing Health Check...');
    const healthOk = await testHealthCheck();

    // Test 2: API Documentation
    console.log('\n2️⃣ Testing API Documentation...');
    const docsOk = await testApiDocs();

    // Summary
    console.log('\n' + '=' * 50);
    console.log('📊 TEST SUMMARY:');
    console.log(`Health Check: ${healthOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`API Docs: ${docsOk ? '✅ PASS' : '❌ FAIL'}`);

    if (healthOk && docsOk) {
      console.log('\n🎉 API is accessible! You can now test in your React app.');
      console.log('\n📝 Next steps:');
      console.log('1. Create a .env file with: VITE_PEST_DISEASE_API_URL=https://crop-disease-detection-api-0spd.onrender.com');
      console.log('2. Run: npm run dev');
      console.log('3. Test the image upload in your React app');
    } else {
      console.log('\n⚠️ API tests failed. Check if the service is running.');
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

main();
