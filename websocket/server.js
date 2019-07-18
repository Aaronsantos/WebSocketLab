const WebSocket = require("ws");
const broker_config = require("../util/config.json");
const broker = require("../util/broker_tools");

const startServer = async () => {

  const wss = new WebSocket.Server({ port: 8080 });
  console.log("WebSocket server running on port 8080");

  await broker.brokerConnect(broker_config.broker, broker_config.queue);

  wss.on("connection", ws => {

    ws.on("message", message => {
      console.log("Message: ", message);
      ws.send("Recebi " + message);
    });

    broker.getMsg(msg => ws.send(msg));
  });

};

startServer();
