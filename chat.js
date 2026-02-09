let currentStage = "START";

const WORKFLOW_1_URL = "https://ashithdev.app.n8n.cloud/webhook/chat";

function showMessage(text) {
  const div = document.getElementById("messages");
  div.innerHTML += `<p>${text}</p>`;
}

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value;
  input.value = "";

  showMessage("You: " + message);

  const res = await fetch(WORKFLOW_1_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "CHAT",
      message,
      stage: currentStage
    })
  });

  const data = await res.json();
  showMessage("Assistant: " + data.message);

  currentStage = data.nextStage;

  if (currentStage === "START_ASSISTED_BROWSING") {
    openAssistedBrowser();
  }
}

function openAssistedBrowser() {
  window.open("assisted-browser.html", "_blank");
}
