const canvasData = document.querySelector('#canvas-data');
const grid = document.querySelector('#grid');

const width = Number(canvasData.dataset.width);
const height = Number(canvasData.dataset.height);
const colorGrid = document.querySelector('#color-grid')
const gridButton = document.querySelector('#grid-button')
let colorList = ["white","black","blue","red","green","yellow","purple","grey","orange","pink"]
let current_color = "black"
let pointerdown = false;
let gridMode = false

document.addEventListener('pointerdown', () => {
    pointerdown = true;
})

document.addEventListener('pointerup', () => {
    pointerdown = false;
})

function gridMaker(width, height){
    for (let i = 0; i < height; i++){
        const gridRow = document.createElement('div');
        for (let i=0; i < width; i++){
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.addEventListener('pointerover', () => {
                if (pointerdown === true){
                    color(gridItem)}})
            gridItem.addEventListener('pointerdown', () => {
                color(gridItem)})
            gridRow.appendChild(gridItem);
        }
    gridRow.classList.add('grid-row')
    grid.appendChild(gridRow)
    }
}


function color(gridItem){
    if (current_color === "rainbow"){
        gridItem.style.backgroundColor = colorList[Math.floor(Math.random() * colorList.length)];
    }
    else{
        gridItem.style.backgroundColor = current_color
    }
}


function gridColorSetup(colorList){
    for (let i=0; i < colorList.length + 1; i++){
        const colorGridItem = document.createElement('div');
        colorGridItem.classList.add('color-grid-item');
        colorGridItem.addEventListener('pointerdown', () => {
            for (let item of colorGrid.children){
                item.classList.remove('highlight-border')
            }
            colorGridItem.classList.add('highlight-border')
            if (i === colorList.length){
                current_color = "rainbow"
            }
            else{
                current_color = colorList[i]
            }})
        if (i === colorList.length){
            colorGridItem.style.background = `linear-gradient(to right, ${colorList.join(", ")})`;}
        else{
            colorGridItem.style.backgroundColor = colorList[i];}
        colorGrid.appendChild(colorGridItem)
    }
}


gridButton.addEventListener('pointerdown', () => {
    const gridItem = document.querySelectorAll('.grid-item')
    if (gridMode === false){
        gridMode = true
        gridButton.textContent = "Grid Mode: On"
        for (let item of gridItem){
            item.classList.add('grid-border')
        }}
    else{
        gridMode = false
        gridButton.textContent = "Grid Mode: Off"
        for (let item of gridItem){
            item.classList.remove('grid-border')
        }
    }
})

gridMaker(width, height)
gridColorSetup(colorList)

