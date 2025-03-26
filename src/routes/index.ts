import { Router } from 'express';
import apiRoutes from './api/index.js';

const router = Router();

router.use('/api', apiRoutes);

// Optional: Catch-all for invalid routes
router.use('*', (_req, res) => res.status(404).json({ message: 'Route not found!' }));

export default router;


