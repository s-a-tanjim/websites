console.log("content.js loaded");

function onMessage(message, sender, sendResponse) {
  console.log(message);
}
chrome.runtime.onMessage.addListener(onMessage);
