import express from 'express';
import https from 'https';
import fs from 'fs';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.router.js';
const app = express();
const privateKey = fs.readFileSync('keys/mydomain.key');
const certificate = fs.readFileSync('keys/mydomain.crt');

const credentials = { key: privateKey, cert: certificate };

dotenv.config();

const httpsServer = https.createServer(credentials, app);


app.use(cors({}));
app.use(express.json({ limit: "50mb" }))

app.use("/api/v1/dalle", dalleRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" })
})

httpsServer.listen(8080, () => {
    console.log('HTTPS Server running on port 8080');
  });