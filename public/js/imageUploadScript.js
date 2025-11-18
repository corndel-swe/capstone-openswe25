const fileInput = document.querySelector(".image-input");
const hiddenInput = document.querySelector(".image-data");

fileInput.addEventListener("change", function () {
    const reader = new FileReader();

    reader.onload = () => {
        hiddenInput.value = reader.result;
    };
    reader.readAsDataURL(this.files[0]);
});