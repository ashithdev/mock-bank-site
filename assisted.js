let stage = "START_ASSISTED_BROWSING";

const WORKFLOW_2_URL = "https://ashithdev.app.n8n.cloud/webhook/assist";

function show(text) {
  document.getElementById("assist-messages")
    .innerHTML += `<p>${text}</p>`;
}

async function callWorkflow2(message = "") {
  const res = await fetch(WORKFLOW_2_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "ACTION",
      stage,
      message
    })
  });

  const data = await res.json();
  show("Assistant: " + data.message);

  if (data.nextStage) {
    stage = data.nextStage;
  }
}

// Initial load
callWorkflow2();

function sendYes() {
  callWorkflow2("yes");
}

function sendNo() {
  callWorkflow2("no");
}
