const toggleButton = document.getElementById('toggle-dark-mode');
const rootElement = document.documentElement;

toggleButton.addEventListener('click', () => {
    if (rootElement.classList.contains('dark-mode')) {
        rootElement.classList.remove('dark-mode');
        rootElement.classList.add('light-mode');
    } else {
        rootElement.classList.remove('light-mode');
        rootElement.classList.add('dark-mode');
    }
});