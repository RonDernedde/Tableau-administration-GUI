// Define the column definitions and row data for the first table
const columnDefs = [
    { field: "username", editable: true },
    { field: "siterole" }
];

const rowData = [
{ username: "ron.dernedde@tui.com", siterole: "Creator" },
{ username: "ron.dernedde@tui.com", siterole: "Creator" },
{ username: "ron.dernedde@tui.com", siterole: "Creator" }
];

// Create the first table
const gridOptions = {
columnDefs: columnDefs,
rowData: rowData,
rowDragManaged: true, // Enable row dragging
animateRows: true, // Add animation to row dragging
onRowDragEnd: function(event) {
    // Handle row drag end event
    // You can access the dragged row data using event.node.data
    // Add the necessary logic to remove the row from the first table
    // and add it to the second table
    console.log("Dragged Row Data:", event.node.data);
}
};

// Setup the first table
document.addEventListener('DOMContentLoaded', () => {
const gridDiv = document.querySelector('#all-users');
new agGrid.Grid(gridDiv, gridOptions);
});

// Define the column definitions and row data for the second table
const columnDefsTwo = [
    { field: "username" },
    { field: "siterole" }
  ];
  
  // specify the data
  const rowDataTwo = [];
  
  // let the grid know which columns and what data to use
  const gridOptionsTwo = {
    columnDefs: columnDefsTwo,
    rowData: rowDataTwo
  };
  
  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', () => {
      const gridDiv = document.querySelector('#myGrid');
      new agGrid.Grid(gridDiv, gridOptionsTwo);
  });
