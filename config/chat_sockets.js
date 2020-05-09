

module.exports.chatSockets = function (socketServer) {

    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function (socket) {
        console.log('new connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });

          // rec event  
        socket.on('join_room', function (data) {
            console.log('joining request rec', data);

            socket.join(data.chatroom);

            // while you want to specefic chat room we use io
            io.in(data.chatroom).emit('user_joined', data);
        })
        

        //detect send_message and broadcast to everyone in the room
        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}