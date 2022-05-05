import { io } from './http';

var users: any = [];

io.on("connection", socket => {
  console.log(socket.id);

  /*   socket.emit('appointment', {
      message: "O user joaogarcez8 agendou um appointment com voce",
      date: Date.now()
    }) */

  socket.on('RegisterUserIdAndSocketId', (data) => {

    users.push({
      user_id: data.user_id,
      plataform: data.plataform,
      socket_id: socket.id,
    });
    console.log(users);

    if (data.user_id === '230c93be-0586-4e4f-856c-f0e1f9f15bab') {
      socket.emit('Notification', {
        message: 'o utilizador X marcou um appointment consigo',
      });
    }

  });

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log(`O user com a socket: ${socket.id} desconectou-se`);
  });
});
