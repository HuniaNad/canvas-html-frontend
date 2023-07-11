const chooseButton = document.getElementById("choose-file")
const fileInputField = document.getElementById("file-input")
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

const openExplorer = (e) => {
    fileInputField.click()
}
const setCanvasBackground = (e) => {
    const imagePath = URL.createObjectURL(e.target.files[0])
    canvas.style.backgroundImage = `url(${imagePath})`
    canvas.style.backgroundRepeat = "no-repeat"
    canvas.style.backgroundSize = "contain"
    canvas.style.backgroundPosition = "center"
    
}

chooseButton.addEventListener("click", openExplorer);
fileInputField.addEventListener("change", setCanvasBackground);