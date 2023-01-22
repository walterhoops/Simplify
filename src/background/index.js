function initialize() {
  // initialize
  initializeContextMenus();
  initializeContextMenuEventListeners();
}

function initializeContextMenus() {
  // Add option when right-clicking
  chrome.runtime.onInstalled.addListener(async () => {
    // remove existing menu items
    chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
      title: "Test",
      id: "test",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
      title: "logHighlightedText",
      id: "logHighlightedText",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
      title: "Simplify",
      id: "simplify",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
        title: "Modal",
        id: "modal",
        contexts: ["selection"],
      });
  });
}

function initializeContextMenuEventListeners() {
  chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }, tab) => {
    switch (menuItemId) {
      case "test":
        console.log("testing context menu");
        break;
      case "logHighlightedText":
        console.log(selectionText);
        break;
      case "simplify":
        console.log("simplifying text");
        onSimplify(selectionText).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        break;
      case "modal":
        let message = {
            action: "open modal",
            text: "blahblah"
        }
        chrome.tabs.sendMessage(tab.id, { message })
    }
  });
}

async function onSimplify(text, age = "5") {
  try {
    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, age: age }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }

    return data.result.replace('\n', '');
  } catch (error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    console.log(error.message);
  }
}

export { initialize };
