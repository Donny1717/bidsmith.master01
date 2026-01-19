const http = require('http');

const testData = {
  userId: `test_user_${Date.now()}`,
  userEmail: 'test@bidsmith.co.uk',
  bidId: `bid_${Date.now()}`
};

console.log('🧪 Testing BidSmith ASF API\n');

console.log('1️⃣ Testing health check...');
http.get('http://localhost:3000/api/health', res => {
  let data = '';
  res.on('data', chunk => (data += chunk));
  res.on('end', () => {
    try {
      console.log('✅ Health:', JSON.parse(data));
    } catch (err) {
      console.error('❌ Failed to parse health response', err.message);
    }
    console.log('\n2️⃣ Testing checkout creation...');
    testCheckout();
  });
});

function testCheckout() {
  const postData = JSON.stringify(testData);

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/stripe/checkout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => (data += chunk));
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('✅ Checkout:', response);
        if (response.url) {
          console.log('\n🎉 Success! Open this URL in your browser:');
          console.log(response.url);
          console.log('\nTest card: 4242 4242 4242 4242');
          console.log('Expiry: 12/34');
          console.log('CVC: 123');
        }
      } catch (err) {
        console.error('❌ Failed to parse checkout response', err.message);
      }
    });
  });

  req.on('error', e => {
    console.error('❌ Error:', e.message);
  });

  req.write(postData);
  req.end();
}
