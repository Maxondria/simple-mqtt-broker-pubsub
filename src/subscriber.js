import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883", {
  username: "deviceId",
  password: "apiKey",
});

const subscribedToTopic = "MaxBingo";

client.on("connect", () => {
  client.subscribe(subscribedToTopic);
});

client.on("message", (topic, message, packet) => {
  if (topic === subscribedToTopic) {
    console.log("After receiving from broker");
    message = message.toString();
    console.log(("message:", message));
    // console.log(packet.properties.userProperties);
  }
});

//Handle errors
client.on("error", (error) => {
  console.log("Error: ", error.message);
});
