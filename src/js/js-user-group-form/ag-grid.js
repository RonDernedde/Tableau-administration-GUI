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

// display tables
document.addEventListener("DOMContentLoaded", () => {
    const gridDivOne = document.querySelector("#all-users");
    new agGrid.Grid(gridDivOne, gridOptions);

    const gridDivTwo = document.querySelector("#all-users-selected");
    new agGrid.Grid(gridDivTwo, gridOptionsTwo);
});

