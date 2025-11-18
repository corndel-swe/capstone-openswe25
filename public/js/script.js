const fileInput = document.querySelector('#profilePicture');
const hiddenInput = document.querySelector('#imageBase64');

fileInput.addEventListener('change', function () {
    const reader = new FileReader();
    
    reader.onload = () => {
        hiddenInput.value = reader.result; 
    };
    console.log(hiddenInput.value)
    reader.readAsDataURL(this.files[0]);
});
