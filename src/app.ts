import express, { Request, Response } from 'express';
import cors from 'cors';
import { carRouter } from './app/module/student/car.router';
import { orderRouter } from './app/module/order/order.router';
const app = express();
// const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/cars', carRouter);
app.use('/api/orders', orderRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Assign ment Servise on ');
});

export default app;
