import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

import Signup from './router/signup.router';

app.use(`/signup`,Signup)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;