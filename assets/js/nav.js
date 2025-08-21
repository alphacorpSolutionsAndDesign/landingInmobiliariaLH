document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById("mobileMenu");
    const menuLinks = mobileMenu.querySelectorAll("a");

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.setAttribute('hidden', '');
        });
    });
});