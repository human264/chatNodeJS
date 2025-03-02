import { Server } from 'socket.io';

export const io = new Server(9080, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });

    socket.on('message', (msg) => {
        console.log(`Received message: ${msg}`);
        // 예: 모든 클라이언트에게 메시지를 브로드캐스트 하고 싶다면:
        // io.emit('message', msg);
    });
});
