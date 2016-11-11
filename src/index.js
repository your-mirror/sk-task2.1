import express from 'express';
import cors from 'cors';
import { router as task2Router } from './tasks2';
import { router as task3Router } from './tasks3';

const app = express();
app.use(cors());

app.use(task2Router);
app.use(task3Router);

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
