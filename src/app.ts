import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import globalErrorHandler from './app/Error/globalErrorHandler';
import notFound from './app/Notfound/notfound';
const app = express();
// const port = 3000;

app.use(express.json());
app.use(cors({ origin: 'https://car-shop-one-indol.vercel.app' }));
// app.use(cors());
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Assign meat Service on ');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
