const fileInput = document.getElementById('file-input');

function selectLocalImage () {
    fileInput.click();
}

const quill = new Quill("#text-editor", {
    modules: {
        toolbar: {
            container: [
                [{ header: [1 , 2, 3, 4, false] }],
                ["link", "image", "blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
            ],
            handlers: {
                image: selectLocalImage,
            },
        },
    },
    placeholder: "",
    theme: "snow",
});

fileInput.addEventListener('change', event => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        const fileUrl = reader.result;
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', fileUrl);
    };

    reader.readAsDataURL(selectedFile);
});

