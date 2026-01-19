#!/bin/bash

echo "Testing checkout creation..."
curl -X POST http://localhost:3000/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_123",
    "userEmail": "test@bidsmith.co.uk",
    "bidId": "bid_456"
  }'

echo
echo
echo "Open the 'url' above in your browser and complete payment with test card:"
echo "Card: 4242 4242 4242 4242"
echo "Expiry: 12/34"
echo "CVC: 123"
