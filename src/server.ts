import express from 'express';
import { customerRouter } from "./customer/customer.routes";

const app = express();
app.use(express.json());

app.use("/customers", customerRouter);

// Fehlerbehandlung
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).json({ error: err.message });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Customer service running on port ${port}`);
});
