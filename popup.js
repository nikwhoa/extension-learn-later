document.addEventListener("DOMContentLoaded", function () {
  const textList = document.getElementById("textList");

  chrome.storage.local.get("selectedText", function (data) {
    const selectedText = data.selectedText;
    if (data.selectedText) {
      for (const text of selectedText) {
        const li = document.createElement("li");
        li.textContent = text;
        textList.appendChild(li);
      }
    }
  });
});

document.getElementById("clear").addEventListener("click", function () {
  chrome.storage.local.remove("selectedText", function () {
    const textList = document.getElementById("textList");
    textList.innerHTML = "";
  });
});

document.getElementById("copy").addEventListener("click", function () {
  const textList = document.getElementById("textList");
  const textArray = Array.from(textList.children).map((li) => li.textContent);
  const text = textArray.join("\n");

  navigator.clipboard.writeText(text).then(() => {
    console.log("Text copied to clipboard");
  });
});
