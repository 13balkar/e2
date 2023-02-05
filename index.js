const express = require('express');
const app = express();
const companyRouter = require('./src/Routes/companyRouter');
const port = 3000;
app.use(express.json());
app.use('/api', companyRouter);
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});