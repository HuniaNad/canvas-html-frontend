const headerInput = document.getElementById("header-input");
const headerColor = document.getElementById("header-color")
const headerTextColor = document.getElementById("header-text-color")
const headerTextDiv = document.querySelector(".card-header")
const headerText = document.getElementById("header")

const footerInput = document.getElementById("footer-input");
const footerColor = document.getElementById("footer-color")
const footerTextColor = document.getElementById("footer-text-color")
const footerTextDiv = document.querySelector(".card-footer")
const footerText = document.getElementById("footer")

const resetButton = document.querySelector('.fa-arrows-rotate')
const chooseButton = document.getElementById("choose-file");
const downloadButton = document.getElementById("download-file");
const fileInputField = document.getElementById("file-input");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width")
const lineColor = document.getElementById("line-color")
var isDrawing = false;


window.addEventListener("load", () => {
  updateHeader()
  canvas.width = canvas.offsetWidth 
  canvas.height = canvas.offsetHeight
  setLineWidth()
})
  
const startDraw = (e) => {
  isDrawing = true
  context.beginPath()
  draw(e)
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

const setLineWidth = () => {
  context.lineWidth = lineWidth.value
}
const setLineColor = () => {
  console.log(lineColor.value)
  context.strokeStyle = lineColor.value
}

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
const updateHeaderTextColor = (e) => {
  headerText.style.color = e.target.value;
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
const updateFooterTextColor = (e) => {
  footerText.style.color = e.target.value;
  document.getElementById("default-text").style.color = e.target.value
}

const resetCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
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
headerTextColor.addEventListener("input", updateHeaderTextColor);
footerInput.addEventListener("input", updateFooter);
footerColor.addEventListener("input", updateFooterColor);
footerTextColor.addEventListener("input", updateFooterTextColor);
chooseButton.addEventListener("click", openExplorer);
fileInputField.addEventListener("change", setCanvasBackground);
downloadButton.addEventListener("click", downloadCard);
resetButton.addEventListener("click", resetCanvas)

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", stopDraw)
lineWidth.addEventListener("input", setLineWidth)
lineColor.addEventListener("input", setLineColor)

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

