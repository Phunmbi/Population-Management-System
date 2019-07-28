import express from 'express';
import cors from'cors';

// Create a new instance of express
const app = express();

//setup express middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cors());

// handle unregistered routes
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found. Use /api/v1 to access the Api'
  });
});

export default app;
