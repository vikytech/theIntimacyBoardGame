const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const totpSecret = process.env.TOTP_SECRET;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}`);
console.log(totpSecret)
});
