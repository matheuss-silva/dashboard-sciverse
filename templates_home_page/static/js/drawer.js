
document.addEventListener('DOMContentLoaded', function() {
const toggleButton = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const mainContent = document.querySelector('.main');
const logoImage = document.querySelector('.dashboard-logo');

toggleButton.addEventListener('click', function() {
    navigation.classList.toggle('collapsed');

    // Alterna o layout principal com base no estado da sidebar
    if (navigation.classList.contains('collapsed')) {
        logoImage.src = '{% static "Logo_Auth_to_sideBar.png" %}'; // Caminho para a logo menor
        mainContent.classList.add('collapsed');
    } else {
        logoImage.src = '{% static "Logo_Auth.png" %}'; // Caminho para a logo padrão
        mainContent.classList.remove('collapsed');
    }
});
});
