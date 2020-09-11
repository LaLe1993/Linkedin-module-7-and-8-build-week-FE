import io from "socket.io-client";

export async function makeSocketConnection() {
  const connOpt = {
    transports: ["websocket"],
  };
  this.socket = io("http://localhost:3007", connOpt);
  this.socket.on("connect", () => {
    this.socket.emit("connectinfo", {
      username: this.state.username,
    });
  });
  this.socket.on("updateUsers", (users) => {
    this.setState({ users });
  });
  this.socket.on("userAfterDC", (users) => {
    console.log("userdc", users);
    this.setState({ users });
  });
  this.socket.on("message", (msg) => {
    console.log(msg);
    this.setState({ msgs: this.state.msgs.concat(msg) });
  });
}
