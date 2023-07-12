const headerInput = document.getElementById("header-input");
const headerText = document.getElementById("header")
const footerInput = document.getElementById("footer-input");
const footerText = document.getElementById("footer")
const chooseButton = document.getElementById("choose-file");
const downloadButton = document.getElementById("download-file");
const fileInputField = document.getElementById("file-input");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

window.onload = () => {
  updateHeader()
}

const updateHeader = () => {
  const textNode = document.createTextNode(headerInput.value);
  while (headerText.firstChild) {
    headerText.firstChild.remove();
  }
  headerText.appendChild(textNode);
}
const updateFooter = (e) => {
  footerText.innerText = e.target.value
}


const openExplorer = (e) => {
  fileInputField.click();
};

const setCanvasBackground = (e) => {
  const imagePath = URL.createObjectURL(e.target.files[0]);
  canvas.style.backgroundImage = `url(${imagePath})`;
  canvas.style.backgroundRepeat = "no-repeat";
  canvas.style.backgroundSize = "contain";
  canvas.style.backgroundPosition = "center";
};

const downloadCard = (e) => {
  const element = document.getElementById("downloadableCard");

  if (element) {
    // Render the element as an image using dom-to-image
    domtoimage
      .toBlob(element)
      .then(function (blob) {
        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);

        // Set download link attributes
        downloadLink.download = `${new Date()}.jpg`;

        // Trigger the download
        downloadLink.click();
      })
      .catch(function (error) {
        console.error("Error rendering element:", error);
      });
  }
};

headerInput.addEventListener("input", updateHeader);
footerInput.addEventListener("input", updateFooter);
chooseButton.addEventListener("click", openExplorer);
fileInputField.addEventListener("change", setCanvasBackground);
downloadButton.addEventListener("click", downloadCard);
