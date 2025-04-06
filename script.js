async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  try {
    const response = await fetch("https://medibot-backend-0def.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    const botReply = data.reply || "Sorry, something went wrong!";
    const condition = data.conditionLevel;
    const note = data.note || "";

    let statusMessage = "";
    if (condition) {
      statusMessage = `🩺 Status: **${condition.toUpperCase()}**`;
      if (note) statusMessage += `\n💡 Note: ${note}`;
    }

    addMessage(`${botReply}\n\n${statusMessage}`, "bot");
  } catch (error) {
    console.error("Error talking to backend:", error);
    addMessage("⚠️ Unable to reach MediBot server. Please try again later.", "bot");
  }
}


function addMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message", `${sender}-message`);
  messageDiv.innerText = text;

  const timestamp = document.createElement("div");
  timestamp.classList.add("timestamp");
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timestamp.innerText = time;

  messageDiv.appendChild(timestamp);
  chatbox.appendChild(messageDiv);

  chatbox.scrollTop = chatbox.scrollHeight;
  chatbox.style.justifyContent = chatbox.scrollHeight > chatbox.clientHeight ? "flex-start" : "center";
}

document.addEventListener("DOMContentLoaded", () => {
  const profileIcon = document.querySelector(".profile-icon");
  const popup = document.querySelector(".profile-popup");

  profileIcon.addEventListener("click", () => {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target) && !popup.contains(e.target)) {
      popup.style.display = "none";
    }
  });

  document.getElementById("userInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Initial friendly greeting
  addMessage("👋 Hello! I'm MediBot, your health companion.\n\nPlease enter your symptoms or medical stats, e.g. -\nheart rate 130 bpm\nchest ache\n\nI’ll provide a quick assessment.", "bot");
});
