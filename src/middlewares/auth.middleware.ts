import {verify} from "jsonwebtoken";
import {User} from "../entities/user.entity";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';

export const AuthMiddleware = async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const accessToken = req.header('Authorization')?.split(' ')[1] || '';
        const payload = verify(accessToken, process.env.JWT_SECRET!); // !는 "non-null assertion"

        const user = await User.findOne({ where: { id: (payload as any).id } });

        (req as any).user = user;

        next();
        return;
    } catch (error) {
        res.status(401).send({
            message: 'unauthenticated',
        });
        return; // 값을 반환하지 않고 함수 종료
    }
};