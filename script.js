function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  setTimeout(() => {
    addMessage(`Got it! You said: "${message}"`, "bot");
  }, 500);
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

  // Scroll to bottom
  chatbox.scrollTop = chatbox.scrollHeight;

  // Check if content height is less than container height
  const isScrollable = chatbox.scrollHeight > chatbox.clientHeight;
  chatbox.style.justifyContent = isScrollable ? "flex-start" : "center";
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
});

