const headerInput = document.getElementById("header-input");
const headerColor = document.getElementById("header-color")
const headerTextColor = document.getElementById("header-text-color")
const headerTextDiv = document.querySelector(".card-header")
const headerText = document.getElementById("header")

const rangeValue = document.querySelector("input[type='range']")
const rangeValuePreview = document.getElementById("range-value")

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

//  Update Header text, pen line width and canvas dimensions on every window load 
window.addEventListener("load", () => {
  updateHeader()
  updateRange()
  canvas.width = canvas.offsetWidth 
  canvas.height = canvas.offsetHeight
  setLineWidth()
})
 
// when cursor starts drawing on mousedown
const startDraw = (e) => {
  isDrawing = true
  context.beginPath()
  draw(e)
}

// when cursor continues drawing on mousemove
const draw = (e) => {
  if(!isDrawing) return;
  context.lineCap = "round"
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
}

// when cursor stops drawing on mouseup
const stopDraw = (e) => {
  isDrawing = false
}

// set pen line width on input
const setLineWidth = () => {
  context.lineWidth = lineWidth.value
}
// set pen line custom color on input
const setLineColor = () => {
  console.log(lineColor.value)
  context.strokeStyle = lineColor.value
}

// update card header on input
const updateHeader = () => {
  const textNode = document.createTextNode(headerInput.value);
  while (headerText.firstChild) {
    headerText.firstChild.remove();
  }
  headerText.appendChild(textNode);
}
// update card header background color on input
const updateHeaderColor = (e) => {
  headerTextDiv.style.backgroundColor = e.target.value;
}
// update card header text color on input
const updateHeaderTextColor = (e) => {
  headerText.style.color = e.target.value;
}

// update range preview value when range input slides
const updateRange = () => {
  console.log(rangeValuePreview)
  const textNode = document.createTextNode(rangeValue.value);
  while (rangeValuePreview.firstChild) {
    rangeValuePreview.firstChild.remove();
  }
  rangeValuePreview.appendChild(textNode);
}

// update card footer on input
const updateFooter = () => {
  const textNode = document.createTextNode(footerInput.value);
  while (footerText.firstChild) {
    footerText.firstChild.remove();
  }
  footerText.appendChild(textNode);
}
// update card footer background color on input
const updateFooterColor = (e) => {
  footerTextDiv.style.backgroundColor = e.target.value;
}
// update card footer text color on input
const updateFooterTextColor = (e) => {
  footerText.style.color = e.target.value;
  document.getElementById("default-text").style.color = e.target.value
}

// clean canvas
const resetCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// open file explorer to select the image to upload on canvas
const openExplorer = (e) => {
  fileInputField.click();
};

// set canvas background as the uploaded image
const setCanvasBackground = (e) => {
  const imagePath = URL.createObjectURL(e.target.files[0]);
  canvas.style.backgroundImage = `url(${imagePath})`;
  canvas.style.backgroundRepeat = "no-repeat";
  canvas.style.backgroundSize = "contain";
  canvas.style.backgroundPosition = "center";
};

// download card
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

// Side Menu Event Listeners
headerInput.addEventListener("input", updateHeader);
headerColor.addEventListener("input", updateHeaderColor);
headerTextColor.addEventListener("input", updateHeaderTextColor);
rangeValue.addEventListener("input", updateRange)
footerInput.addEventListener("input", updateFooter);
footerColor.addEventListener("input", updateFooterColor);
footerTextColor.addEventListener("input", updateFooterTextColor);
chooseButton.addEventListener("click", openExplorer);
fileInputField.addEventListener("change", setCanvasBackground);
downloadButton.addEventListener("click", downloadCard);
resetButton.addEventListener("click", resetCanvas)

// Canvas Event Listeners
canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", stopDraw)
lineWidth.addEventListener("input", setLineWidth)
lineColor.addEventListener("input", setLineColor)

// Bootstrap Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

