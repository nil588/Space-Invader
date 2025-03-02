const socket = new WebSocket("ws://your-server-address");

socket.onopen = () => {
    console.log("Connected to server");
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Multiplayer Update:", data);
};
