import { io } from './http';
import UserSocketService from '@modules/users/services/UserSocketService';
import { container } from 'tsyringe';

const userSocketService: UserSocketService = container.resolve(UserSocketService);

io.on("connection", socket => {

  socket.on('RegisterUserIdAndSocketId', async (data) => {
    await userSocketService.create({
      user_id: data.user_id,
      socket_id: socket.id,
      platform: data.plataform,
    });
  });

  socket.on('RegisterUserIdAndSocketId_Mobile', async (data) => {
    const userSockets = await userSocketService.findByUserIdAndPlatform(data.provider_id, 'website');
    userSockets.map((userSocket) => {

      io.to(userSocket.socket_id).emit('Notification', {
        message: `O utilizador ${data.username} agendou um appointment com você ${data.date}`,
      })
    });
  });

  socket.on('logout', async (data) => {
    await userSocketService.delete(data.user_id);
  });

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', async () => {
    await userSocketService.delete(socket.id);
  });
});
