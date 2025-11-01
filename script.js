const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const difficulty = document.getElementById("difficulty");
const passwordField = document.getElementById("password");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const historyList = document.getElementById("historyList");

if (lengthInput) {
  lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
  });
}

if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthInput.value);
    const level = difficulty.value;

    let charset = "";
    switch (level) {
      case "easy":
        charset = "abcdefghijklmnopqrstuvwxyz";
        break;
      case "medium":
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        break;
      case "hard":
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]?><~";
        break;
    }

    let password = "";
    const random = new Uint32Array(length);
    crypto.getRandomValues(random);
    for (let i = 0; i < length; i++) {
      password += charset[random[i] % charset.length];
    }

    passwordField.value = password;

    const listItem = document.createElement("li");
    listItem.textContent = password;
    listItem.style.opacity = 0;
    historyList.prepend(listItem);
    setTimeout(() => listItem.style.opacity = 1, 100);
  });
}

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    if (passwordField.value) {
      navigator.clipboard.writeText(passwordField.value);
      copyBtn.textContent = "✅";
      copyBtn.style.background = "#00e676";
      setTimeout(() => {
        copyBtn.textContent = "📋";
        copyBtn.style.background = "gold";
      }, 700);
    }
  });
}
