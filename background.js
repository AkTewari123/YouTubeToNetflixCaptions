chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const youtube = "https://www.youtube.com/watch";

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(youtube)) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].url.match("https://www.youtube.com/.*")) {
          chrome.tabs.sendMessage(tab.id, {
            type: "NEW",
            videoId: urlParameters.get("v"),
          });
        }
      });
    }
  } else if (typeof nextState === "undefined" || nextState === "OFF") {
  }
});
