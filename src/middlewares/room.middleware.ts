import {Room} from "../entities/room.entity";


export const RoomMiddleware = async (req, res, next) => {
    const id = req.params.room as any
    req['room'] = await Room.findOne({where: {id}, relations: ["members"]})
    next()
}