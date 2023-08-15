import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Blockchain } from './simpleBlockchain';
import { Transaction } from './simpleBlockchain';

const blockchain = new Blockchain();
const app = express();
app.use(bodyParser.json());

// add transcation

app.post('/transactions', (req, res) => {
    const requiredKeys = ['from','to','amount'];

    for (const key of requiredKeys) {
        if (!req.body[key]) {
            res.status(400).json({ error: `${key} field is required` });
            return;
        }
    }
    const { from, to, amount } = req.body;
    try {
        const transaction = new Transaction(from, to, amount);
        const response = blockchain.addTransaction(transaction);
        res.status(201).json(transaction);

    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// get balance for give address

app.get('/balance/:address', (req, res) => {
    const address = req.params.address;
    if(!address){
        res.status(400).json('address field is required.')
        return;
    }

    const balance = blockchain.getBalance(address);

    res.json({ address, balance });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// get transcation history

app.get('/transactions/:address', (req, res) => {
    const address = req.params.address;

    if(!address){
        res.status(400).json('address field is required.')
        return;
    }
    const transactions = blockchain.getTransactionHistory(address);

    res.json({ address, transactions });
});
