const container = document.getElementById('container');
let isMouseDown = false;  // Variable to track if the mouse is being pressed

// Function to create the grid
function makeGrid(rows, cols) {
    // Reset the grid
    container.innerHTML = '';
    
    // Update CSS grid variables
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    // Create the grid items
    for (let i = 0; i < (rows * cols); i++) {
        let cell = document.createElement('div');
        container.appendChild(cell).className = 'grid-item';

        // Event listener for mouse over (paint while moving)
        cell.addEventListener('mouseover', function() {
            if (isMouseDown) {
                cell.style.backgroundColor = 'gray';  // Paint the cell when mouse is down
                cell.classList.add('permanently-painted');  // Mark it as painted
            }
        });

        // Event listener for single click (paint on click)
        cell.addEventListener('mousedown', function() {
            cell.style.backgroundColor = 'gray';  // Paint the cell
            cell.classList.add('permanently-painted');  // Mark it as painted
        });
    }
}

// Event listener for form submission
document.getElementById('gridForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting the default way
    
    // Get the values from the inputs
    let rows = document.getElementById('rows').value;
    let cols = document.getElementById('cols').value;

    // Default to 16 if inputs are empty
    rows = rows ? rows : 16;
    cols = cols ? cols : 16;

    // Check if the values exceed the maximum of 100
    if (rows > 100 || cols > 100) {
        alert("Rows and columns cannot be greater than 100. Please enter a valid number.");
        return;  // Stop the execution if the condition is met
    }

    // Call makeGrid with the user inputs or defaults
    makeGrid(rows, cols);
});

// Mouse events to track when the mouse is pressed or released
document.body.addEventListener('mousedown', function(event) {
    if (event.button === 0) {  // Check if the left button is pressed
        isMouseDown = true;
    }
});

document.body.addEventListener('mouseup', function() {
    isMouseDown = false;  // Reset when the mouse button is released
});

// Set an initial grid of 16x16 on page load
makeGrid(16, 16);
