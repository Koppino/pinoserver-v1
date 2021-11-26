const { Socket } = require("socket.io");
const ChatMessage = require("../models/ChatMessage");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");
const cntrl = require("./ChatController");


module.exports.getChatView = (req, res) => {
  User.find({}, null, { sort: { username: 1 } }, (err, chatUsers) => {
    if (err) throw err;
    res.render("chat/chat", {
      user: req.user,
      chatMessages: [],
      chatUsers: chatUsers,
      chatUser: User(),
    });
  });
};

module.exports.getChatViewWithFriend = (req, res) => {
  const uid = req.params.uid;
  User.find({}, null, { sort: { username: 1 } }, (err, chatUsers) => {
    if (err) throw err;
    User.findOne({ _id: uid }, (err, friend) => {
      if (err) console.log(err);
      if (!friend) return console.log("no reciver.");

      ChatRoom.findOne(
        { users: [req.user, friend] || [friend, req.user] },
        (err, room) => {
          if (err) return console.log(err);
          if (!room) {
            cntrl.createChatRoom([req.user, friend]);
            cntrl.createChatRoom([friend, req.user]);
          }

          ChatMessage.find(
            { room: room },
            null,
            { sort: { createdAt: 1 } },
            (err, mssgs) => {
              if (err) console.log(err);
              res.render("chat/chat", {
                user: req.user,
                chatMessages: mssgs,
                chatUsers: chatUsers,
                chatUser: friend,
              });
            }
          );
        }
      );
    });
  });
};

module.exports.createChatRoom = (users) => {
  console.log(users);
  const newChatRoom = new ChatRoom({
    users: users,
    lastMessage: null,
    lastMesssageTime: null,
  });
  newChatRoom.save(() => {
    console.log("room created.");
  });
};
module.exports.getChatWithAll = (req, res) => {};

module.exports.postMessage = (req, res) => {
  const reciverUserId = req.params.uid;
  const senderUserId = req.user._id;
  const senderUserName = req.user.username;

  const { textMessage, reciverUserName } = req.body;

  User.findOne({ _id: reciverUserId }, (err, reciver) => {
    if (err) console.log(err);
    if (!reciver) {
      return console.log("no reciver");
    }
    ChatRoom.findOne({ users: [reciver, req.user] }, (err, chatRoom) => {
      if (err) console.log(err);

      ChatRoom.findOne({ users: [req.user, reciver] }, (err, chatRoom2) => {
        if (err) console.log(err);
        const newMsg2 = new ChatMessage({
          senderUserName: senderUserName,
          senderUserId: senderUserId,
          reciverUserName: reciverUserName,
          reciverUserId: reciverUserId,
          message: textMessage,
          room: chatRoom2,
          createdAt: Date.now(),
        });

        newMsg2.save(() => {
          console.log("chat message2 added.");
        });
      });

      const newMsg = new ChatMessage({
        senderUserName: senderUserName,
        senderUserId: senderUserId,
        reciverUserName: reciverUserName,
        reciverUserId: reciverUserId,
        message: textMessage,
        room: chatRoom,
        createdAt: Date.now(),
      });

      newMsg.save(() => {
        console.log("chat message added.");
        Socket.EventEmitter("chat message", newMsg)
        res.redirect(`/chat/${reciverUserId}`)
      });
    });
  });
};

module.exports.postMessageRT = (msg) => {
  console.log(msg);
};
