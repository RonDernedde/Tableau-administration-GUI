
document.addEventListener('DOMContentLoaded', () => {
    const openUserModalButton = document.getElementById('text-data-button');
    const closeUserModalButton = document.getElementById('close-button-text');
    const userModal = document.getElementById('modal-text');

    openUserModalButton.addEventListener('click', () => {
        userModal.show();
        userModal.classList.add('show-model');
    });

    closeUserModalButton.addEventListener('click', () => {
        userModal.close();
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const openTextModalButton = document.getElementById('open-button-user');
    const closeTextModalButton = document.getElementById('close-button-user');
    const textModal = document.getElementById('modal-user');

    openTextModalButton.addEventListener('click', () => {
        textModal.show();
        textModal.classList.add('show-model');
        textModal.style.flex = 'flex';
    });

    closeTextModalButton.addEventListener('click', () => {
        textModal.close();
        textModal.style.flex = 'none';
    });
});

const uploadButton = document.getElementById('excel-data-button');
const fileInput = document.getElementById('file-input');
uploadButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];

    // Validate if a file was selected
    if (file) {
        // Perform further processing with the file
        console.log('Selected file:', file.name);
        // You can use libraries like XLSX.js or SheetJS to parse the Excel file
        // and extract data as needed.
    }
}


  