document.addEventListener('DOMContentLoaded', () => {
    const openModalButtons = document.querySelectorAll(".openModal");
    const closeModalButtons = document.querySelectorAll(".closeModal");

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-target');
            document.getElementById(modalId).classList.remove('hidden');
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-target');
            document.getElementById(modalId).classList.add('hidden');
        });
    });
});