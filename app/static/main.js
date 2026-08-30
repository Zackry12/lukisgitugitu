const postDrawings = document.querySelectorAll(".drawing");


function renderDrawing(canvas, drawingData){
    const ctx = canvas.getContext("2d");
    const cellSize = 100;
    const rows = drawingData.length;
    const columns = drawingData[0].length;

    canvas.width = columns * cellSize;
    canvas.height = rows * cellSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < rows; row++){
        for (let column = 0; column < columns; column++){
            const color = drawingData[row][column];
            ctx.fillStyle = color;
            ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}


postDrawings.forEach(post => {
    const drawing_ = JSON.parse(post.dataset.drawing);
    const canvas = post.querySelector(".drawing-canvas");
    renderDrawing(canvas, drawing_);
})