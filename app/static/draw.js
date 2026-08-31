const canvasData = document.querySelector('#canvas-data');
const grid = document.querySelector('#grid');

const width = Number(canvasData.dataset.width);
const height = Number(canvasData.dataset.height);
const colorGrid = document.querySelector('#color-grid')
const gridButton = document.querySelector('#grid-button')
const clearButton = document.querySelector('#clear-button')
const brushSize = document.querySelector('#brush-size')
const form = document.querySelector("form")
let colorList = ["white","black","blue","red","green","yellow","purple","grey","orange","pink"]
let current_color = "black"
let is_drawing = false;
let gridMode = false;
// let brush_size = 1;

const gridData = Array(height).fill().map(() => Array(width).fill("white"))

document.addEventListener('pointerup', () => {
    is_drawing = false;
})


grid.addEventListener('pointerdown', (e) => {
    is_drawing = true;
    const cell = document.elementFromPoint(e.clientX, e.clientY);

    if (cell?.classList.contains('grid-item')){
        color(cell, cell.dataset.row, cell.dataset.column);
    }
})

grid.addEventListener('pointermove', (e) => {
    if (is_drawing){
        const cell = document.elementFromPoint(e.clientX, e.clientY);
        if (cell?.classList.contains('grid-item')){
            color(cell, cell.dataset.row, cell.dataset.column);
        }
    }
});


document.addEventListener('pointerup', () => {
    is_drawing = false;
})


function gridMaker(width, height){
    for (let row = 0; row < height; row++){
        const gridRow = document.createElement('div');
        for (let column=0; column < width; column++){
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.row = row;
            gridItem.dataset.column = column;
            gridRow.appendChild(gridItem);
        }
    gridRow.classList.add('grid-row')
    grid.appendChild(gridRow)
    }
}



function color(gridItem, row, column){
    if (current_color === "rainbow"){
        rainbow_color = colorList[Math.floor(Math.random() * colorList.length)]
        gridItem.style.backgroundColor = rainbow_color;
        gridData[row][column] =  rainbow_color
    }
    else{
        gridItem.style.backgroundColor = current_color 
        gridData[row][column] =  current_color
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


clearButton.addEventListener('pointerdown', () => {
    const previousColor = current_color
    current_color = "white"
    const gridItem = document.querySelectorAll('.grid-item')
    for (let item of gridItem){
        color(item, item.dataset.row, item.dataset.column)
    }
    current_color = previousColor
})

// brushSize.addEventListener('change', () => {
//     brush_size = Number(brushSize.value)
//     console.log(`Brush size changed to: ${brush_size}`);
// })


// function size_targeting(row, column){
//     let size = brush_size - 1
//     if size > 0{
//         for let i = 1; i <= size; i++){

//     }
// }




gridMaker(width, height)
gridColorSetup(colorList)
// brush_size = Number(brushSize.value)

form.addEventListener("submit", (event) => {
    document.querySelector("#drawing").value = JSON.stringify(gridData)
})

