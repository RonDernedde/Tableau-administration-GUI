const openUserModalButton = document.getElementById('text-data-button');
const closeUserModalButton = document.getElementById('close-button-text');
const userModal = document.getElementById('modal-text');

openUserModalButton.addEventListener('click', () => {
    userModal.show();
});

closeUserModalButton.addEventListener('click', () => {
    userModal.close();
});

const openTextModalButton = document.getElementById('open-button-user');
const closeTextModalButton = document.getElementById('close-button-user');
const textModal = document.getElementById('modal-user');

openTextModalButton.addEventListener('click', () => {
    textModal.show();
});

closeTextModalButton.addEventListener('click', () => {
    textModal.close();
});