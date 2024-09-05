document.addEventListener('DOMContentLoaded', function() {
    const helpButton = document.getElementById('help-button');
    const helpPopup = document.getElementById('help-popup-container');
    const closeHelpPopup = document.getElementById('close-help-popup');

    helpButton.addEventListener('click', function() {
        helpPopup.classList.add('active');
    });

    closeHelpPopup.addEventListener('click', function() {
        helpPopup.classList.remove('active');
    });
});
