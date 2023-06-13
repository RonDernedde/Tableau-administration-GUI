// column definition
const columnDefs = [
    { field: "id", editable: true, dndSource: true, width: 100 },
    { field: "username", editable: true },
    { field: "siterole" }
];

const columnDefsTwo = [
    { field: "id", editable: true, dndSource: true, width: 80 },
    { field: "username", editable: true, width: 200 },
    { field: "siterole", width: 140 },
    { headerName: 'Delete', cellRenderer: 'deleteButtonRenderer', width: 120 },
];

// row data
const rowData = [
    { id: 1, username: "ron.dernedde@tui.com", siterole: "Creator" },
    { id: 2, username: "ron.dernedde@tui.com", siterole: "Creator" },
    { id: 3, username: "ron.dernedde@tui.com", siterole: "Creator" }
];

const rowDataTwo = [];

// grid options
const gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true
    },
    getRowId: params => { return params.data.id; },
    rowDragManaged: true,
    columnDefs: columnDefs,
    rowData: rowData,
    animateRows: true
};

const gridOptionsTwo = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true
    },
    getRowId: params => { return params.data.id; },
    rowDragManaged: true,
    columnDefs: columnDefsTwo,
    rowData: rowDataTwo,
    animateRows: true,
    components: {
        deleteButtonRenderer: deleteButtonRenderer
    }
};

function gridDragOver(event) {
    var dragSupported = event.dataTransfer.types.length;

    if (dragSupported) {
      event.dataTransfer.dropEffect = "copy";
      event.preventDefault();
    }
}

function gridDrop(event, grid) {
    event.preventDefault();

    var jsonData = event.dataTransfer.getData("application/json");
    var data = JSON.parse(jsonData);

    // if data missing or data has no id, do nothing
    if (!data || data.id == null) {
      return;
    }

    var gridApi = grid == "left" ? gridOptions.api : gridOptionsTwo.api;

    // do nothing if row is already in the grid, otherwise we would have duplicates
    var rowAlreadyInGrid = !!gridApi.getRowNode(data.id);
    if (rowAlreadyInGrid) {
      console.log("not adding row to avoid duplicates in the grid");
      return;
    }

    var transaction = {
    add: [data]
    };
    gridApi.applyTransaction(transaction);
}

function deleteButtonRenderer(params) {
    var button = document.createElement('button');
    button.innerHTML = ' ';
    button.classList.add("ag-delete-button");
    button.addEventListener('click', function () {
      var rowNode = params.node;

      if (rowNode) {
        const transaction = {
            remove: [rowNode.data],
        };

        gridOptionsTwo.api.applyTransaction(transaction);
      }
      //console.log('Delete button clicked for row:', rowNode.data);
    });
    return button;
  }

function insertCommasAtIndices(string, indices) {
  let result = string;
  
  for (let i = indices.length - 1; i >= 0; i--) {
      const index = indices[i];
      result = result.slice(0, index) + ',' + result.slice(index);
  }
  
  return result;
}

// text-boy functions
const textareaElement = document.getElementById('textarea');
const addToTableButtonElement = document.getElementById('add-table-button');
const addSeperatorButtonElement = document.getElementById('add-seperator-button');

// add seperator 
addSeperatorButtonElement.addEventListener('click', () => {
  const textareaInput = textareaElement.value;

  // search for endings in string and safe indexes
  const searchStrings = ['.com', 'co.uk', '.be'];
  const indexes = [];
  searchStrings.forEach(element => {
      indexes.push(...[...textareaInput.matchAll(new RegExp(element, 'gi'))].map(a => a.index + element.length));     
  });
  indexes.sort((a, b) => a - b);

  // insert commas into string
  let seperatedString = insertCommasAtIndices(textareaInput, indexes);
  seperatedString = seperatedString.slice(0, -1);

  // write value comma separted to array
  let emailsAddresses = seperatedString.split(',');

  // Get the current row data from the grid
  const rowData = gridOptionsTwo.api.getDataAsCsv({ skipColumnHeader: true });

  // Determine the starting ID for the new rows
  const startingId = rowData.length > 0 ? rowData[rowData.length - 1].id + 1 : 1;

  // Create new row data from the array
  const newRowData = emailsAddresses.map((value, index) => ({
      id: startingId + index,
      username: value,
      siterole: '' 
  }));

  // Add the new row data to the grid
  const transaction = {
    add: newRowData
  };
  
  gridOptionsTwo.api.applyTransaction(transaction);
});

// display tables
document.addEventListener("DOMContentLoaded", () => {
  const gridDivOne = document.querySelector("#all-users");
  new agGrid.Grid(gridDivOne, gridOptions);

  const gridDivTwo = document.querySelector("#all-users-selected");
  new agGrid.Grid(gridDivTwo, gridOptionsTwo);
});