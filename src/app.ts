import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
const app = express();
// const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Assign meat Service on ');
});

export default app;
