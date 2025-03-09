import { useEffect } from "react";

const useNotification = (title, options) => {
    useEffect(() => {
        // Check if the browser supports notifications
        if (!("Notification" in window)) {
            console.error("This browser does not support desktop notifications.");
            return;
        }

        // Request permission to send notifications
        const askPermission = async () => {
            if (Notification.permission === "default") {
                await Notification.requestPermission();
            }
        };

        askPermission();

        // Send notification if permission is granted
        const sendNotification = () => {
            if (Notification.permission === "granted") {
                const notification = new Notification(title, options);

                // Add an optional click handler
                notification.onclick = () => {
                    window.focus(); // Bring the app back into focus
                };
            }
        };

        // Trigger notification when the app is not in focus
        const handleVisibilityChange = () => {
            if (document.hidden) {
                sendNotification();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [title, options]);
};

export default useNotification;
