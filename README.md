# blockchain_transcation
objective of this repository to handle transcation using blockchain utility , nodejs , expressjs and typescript

# run project
npm run start

# endpoints

1. POST http://localhost:3000/transactions (create transactions)
   BODY : 
   {
  "from": "address",
  "to": "address",
  "amount": 0
}

2. GET http://localhost:3000/balance/address (get total amount for given address in params)

3. GET http://localhost:3000/transactions/address (get all transcations for given address in params)