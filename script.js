const headerInput = document.getElementById("header-input");
const headerColor = document.getElementById("header-color")
const headerTextDiv = document.querySelector(".card-header")
const headerText = document.getElementById("header")

const footerInput = document.getElementById("footer-input");
const footerColor = document.getElementById("footer-color")
const footerTextDiv = document.querySelector(".card-footer")
const footerText = document.getElementById("footer")

const chooseButton = document.getElementById("choose-file");
const downloadButton = document.getElementById("download-file");
const fileInputField = document.getElementById("file-input");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var isDrawing = false;


window.addEventListener("load", ()=>{
  updateHeader()
  canvas.width = canvas.offsetWidth 
  canvas.height = canvas.offsetHeight
})
  


const startDraw = (e) => {
  isDrawing = true
  context.beginPath()
}

const draw = (e) => {
  if(!isDrawing) return;
  context.lineCap = "round"
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
}

const stopDraw = (e) => {
  isDrawing = false
}


canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", stopDraw)





















const updateHeader = () => {
  const textNode = document.createTextNode(headerInput.value);
  while (headerText.firstChild) {
    headerText.firstChild.remove();
  }
  headerText.appendChild(textNode);
}
const updateHeaderColor = (e) => {
  headerTextDiv.style.backgroundColor = e.target.value;
}

const updateFooter = () => {
  const textNode = document.createTextNode(footerInput.value);
  while (footerText.firstChild) {
    footerText.firstChild.remove();
  }
  footerText.appendChild(textNode);
}
const updateFooterColor = (e) => {
  footerTextDiv.style.backgroundColor = e.target.value;
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
headerColor.addEventListener("input", updateHeaderColor);
footerInput.addEventListener("input", updateFooter);
footerColor.addEventListener("input", updateFooterColor);
chooseButton.addEventListener("click", openExplorer);
fileInputField.addEventListener("change", setCanvasBackground);
downloadButton.addEventListener("click", downloadCard);
