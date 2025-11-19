document.addEventListener('DOMContentLoaded', () => {
    const resetBtns = document.querySelectorAll('.reset-button')
    for (const btn of resetBtns) {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target-id');
            const select = document.querySelector(targetId);
            if(select) {
                select.value = '';
            }
        })
    }
})