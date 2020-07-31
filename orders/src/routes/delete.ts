import express, { Request, Response } from 'express';
import { requireAuth } from '@dev-ticketing/common';

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
    res.send({});
});

export { router as deleteOrderRouter };