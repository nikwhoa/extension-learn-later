function checkWords() {
  chrome.storage.local.get(["selectedText"], (result) => {
    const selectedText = result.selectedText || [];
    if (selectedText.length >= 50) {
      alert("You have selected 50 words. Please clear the list to save more.");
      return true;
    }
  });
}

document.addEventListener("keydown", function (event) {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText && event.metaKey && event.key === "b") {
    chrome.storage.local.get(["selectedText"], (result) => {
      const previousSelections = result.selectedText || [];

      if (previousSelections.includes(selectedText) || checkWords()) {
        return;
      }

      const updatedSelections = [...previousSelections, selectedText];

      chrome.storage.local.set({ selectedText: updatedSelections }).then(() => {
        console.log("Selected text saved to local storage");
      });
    });
  }
});
