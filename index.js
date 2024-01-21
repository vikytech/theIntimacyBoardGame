const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { authenticator } = require('otplib');

const app = express();
const port = 3000;
// const totpSecret = authenticator.generateSecret();
const totpSecret = process.env.TOTP_SECRET;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const totpMiddleware = (req, res, next) => {
  const { totpToken } = req.body;

  const isValid = authenticator.verify({ token: totpToken, secret: totpSecret });

  if (isValid) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid TOTP token' });
  }
};

app.get('/totp', totpMiddleware, (req, res) => {
  res.json({ totp: authenticator.generate(totpSecret) });
});

app.post('/auth/totp', totpMiddleware, (req, res) => {
  res.json({ message: 'TOTP authentication successful' });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(totpSecret)
});
