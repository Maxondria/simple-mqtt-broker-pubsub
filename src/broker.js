import mosca from "mosca";

const broker = new mosca.Server({ port: 1883 });

broker.on("ready", () => console.log("Broker up and running..."));

broker.authenticate = function (client, username, password, callback) {
  const authorized =
    username === "deviceId" && password.toString() === "apiKey";
  client.user = JSON.stringify({ username, password: password.toString() });
  callback(null, authorized);
};

// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
//   var authorizePublish = function(client, topic, payload, callback) {
//     callback(null, client.user == topic.split('/')[1]);
//   }

// Accepts the connection if the username and password are valid
// var authenticate = function(client, username, password, callback) {
//     var authorized = (username === 'alice' && password.toString() === 'secret');
//     if (authorized) client.user = username;
//     callback(null, authorized);
//   }

// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
//   var authorizePublish = function(client, topic, payload, callback) {
//     callback(null, client.user == topic.split('/')[1]);
//   }

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
//   var authorizeSubscribe = function(client, topic, callback) {
//     callback(null, client.user == topic.split('/')[1]);
//   }

broker.on("published", (packet, client) => {
  //   console.log("Client: ", client);
  //   console.log("Topic: ", packet.topic);
  //   console.log("Message: ", packet.payload.toString());
  //   if (packet.payload.toString() === "Message 5") {
  //     const message = {
  //       topic: "/hello/message5/published",
  //       payload: packet.payload.toString(), // or a Buffer
  //       qos: 0, // 0, 1, or 2
  //       retain: false, // or true
  //     };
  //     broker.publish(message, function () {
  //       console.log("done publishing from broker!");
  //     });
  //   }
});

// const message = {
//   topic: "/hello/message5/published",
//   payload: "Even me, the broker can publish stuff", // or a Buffer
//   qos: 1, // 0, 1, or 2
//   retain: false, // or true
// };

// broker.publish(message, function () {
//   console.log("done!");
// });
