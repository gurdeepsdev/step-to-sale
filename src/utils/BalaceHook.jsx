import  { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust the URL based on your backend

const WalletBalance = ({ userId }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        // Connect to the WebSocket and join the user's room
        socket.emit("joinRoom", userId);

        // Listen for balance updates
        socket.on("balanceUpdated", (data) => {
            setBalance(data.balance); // Update state with new balance
        });

        return () => {
            socket.off("balanceUpdated");
        };
    }, [userId]);

    return <h2>Wallet Balance: ${balance}</h2>;
};

export default WalletBalance;
