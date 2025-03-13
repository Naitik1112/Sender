"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function NotificationCard() {
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    message: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendEmail = async () => {
    if (!emailData.recipient || !emailData.subject || !emailData.message) {
      setAlertMessage("All fields are required!");
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      setAlertMessage(data.message);
      setShowAlert(true);
      setTimeout(() => window.location.reload(), 3000); // Reload after 3 sec
    } catch (error) {
      setAlertMessage("Error sending email.");
      setShowAlert(true);
      setTimeout(() => window.location.reload(), 3000);
    }
  };

  const handleSendNotification = () => {
    setAlertMessage("The notification has been sent!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#2C2143] to-black text-white p-4">
      <motion.div
        className="relative flex items-center justify-center p-6 bg-[#4B3879] rounded-full shadow-lg"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Bell size={80} className="text-[#A48EDB]" />
        <div className="absolute w-36 h-36 border-2 border-[#A48EDB] rounded-full animate-ping" />
      </motion.div>

      {/* Send Notification Button */}
      <button
        onClick={handleSendNotification}
        className="mt-16 px-6 py-2 border border-[#A48EDB] text-[#A48EDB] rounded-full hover:bg-[#4B3879] transition w-full max-w-md"
      >
        Send Notification
      </button>

      {/* Email Form */}
      <div className="mt-4 w-full max-w-md bg-[#1E1532] p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-center">
          Send a Notification via Email
        </h3>
        <input
          type="email"
          name="recipient"
          placeholder="Recipient's Email"
          value={emailData.recipient}
          onChange={handleEmailChange}
          className="mt-2 p-2 bg-[#2C2143] text-white rounded-md w-full"
        />
        <input
          type="text"
          name="subject"
          placeholder="Email Subject"
          value={emailData.subject}
          onChange={handleEmailChange}
          className="mt-2 p-2 bg-[#2C2143] text-white rounded-md w-full"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={emailData.message}
          onChange={handleEmailChange}
          className="mt-2 p-2 bg-[#2C2143] text-white rounded-md w-full"
        />
        <button
          onClick={handleSendEmail}
          className="mt-4 px-6 py-2 border border-[#A48EDB] text-[#A48EDB] rounded-full hover:bg-[#4B3879] transition w-full"
        >
          Send Email
        </button>
      </div>

      {/* Custom Alert Box */}
      {showAlert && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-[#A48EDB] text-white p-4 rounded-lg shadow-lg">
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
}
