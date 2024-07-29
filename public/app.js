// Define the callback function
function showDrawing() {
    annotationsAPI.module('drawing').addDrawingArea('1', document.body);
    annotationsAPI.module('drawing').show();
    annotationsAPI.module('drawing').enterDrawingMode();
}

function showNotepad() {
    annotationsAPI.module('notepad').show();
}

function showStickynote() {
    annotationsAPI.module('stickynote').addNote();
}

// Get the button element by its ID
const showDrawingButton = document.getElementById('showDrawingArea');
const showNotepadButton = document.getElementById('showNotepad');
const showStickynoteButton = document.getElementById('showStickyNote');

// Link the button to the callback function using an event listener
showDrawingButton.addEventListener('click', showDrawing);
showNotepadButton.addEventListener('click', showNotepad);
showStickynoteButton.addEventListener('click', showStickynote);
