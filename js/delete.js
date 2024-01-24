export function deleteItems() {

    let bouton_supprimer = document.querySelectorAll('.conteneur__idDiv__bouton-suppression');
    bouton_supprimer.forEach(function (bouton) {
        bouton.addEventListener('click', function () {
            this.parentElement.remove();
        });
    });
}