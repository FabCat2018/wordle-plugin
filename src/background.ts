// this is the background code...

// listen for our browserAction to be clicked
chrome.action.onClicked.addListener((tab) => {
  // for the current tab, inject the "inject.js" file & execute it
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id ? tab.id : -1 },
      func: () => console.log("Line"),
      args: [],
    })
    .then();
});
