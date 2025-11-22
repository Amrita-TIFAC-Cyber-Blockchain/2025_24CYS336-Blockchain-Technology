import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import pinataRoutes from './routes/pinata.js';
import instRoutes from './routes/institutions.js';
import certRoutes from './routes/certificates.js';
import shareRoutes from './routes/share.js';
import { startIndexer } from './services/indexer.js';
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import institutionRoutes from "./routes/institution.js";
import studentRoutes from "./routes/student.js";
import verifyRoutes from "./routes/verify.js";



const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));

const PORT = process.env.PORT || 4000;

await connectDB(process.env.MONGODB_URI);
console.log('MongoDB connected');

startIndexer().catch(err => console.error('Indexer error', err));

// Routes
app.use('/api/pinata', pinataRoutes);
app.use('/api/institutions', instRoutes);
app.use('/api/certificates', certRoutes);
app.use('/api/share', shareRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/institution", institutionRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/verify", verifyRoutes);

app.get('/', (_, res) => res.send('Credential backend running'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
