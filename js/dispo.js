export function dispoFunction(eventDiv) {


    let dispoForm = eventDiv.querySelector('.conteneur__idDiv__dispo-form');

    dispoForm.addEventListener('submit', function (event) {

        event.preventDefault();

        // valeurs du formulaire stockées dans des variables
        let dispoNameInput = dispoForm.querySelector('input[name="dispoName"]').value;
        let dispoStatusInput = dispoForm.querySelector('select[name="dispoStatus"]').value;
        let dispoList = eventDiv.querySelector('.dispo-list');

        // ajout du paragraphe
        let dispoPara = document.createElement('div');
        dispoPara.className = 'dispo-list__conteneur-dispo';
        dispoPara.innerHTML = `
        <div class="dispo-list__conteneur-dispo__texte">
        <p>${dispoNameInput} ${dispoStatusInput}</p></div>
        <div class="dispo-list__conteneur-dispo__boutons">
        <button class="dispo-list__conteneur-dispo__boutons__edit" onclick="editEvent(div, '')">Éditer</button>
        <button class='dispo-list__conteneur-dispo__boutons__suppression' type="button">Supprimer</button>
        </div>
        `;
        dispoList.appendChild(dispoPara);

        let deleteButton = dispoPara.querySelector('.dispo-list__conteneur-dispo__boutons__suppression');
        deleteButton.addEventListener('click', function () {
            deleteDispo(dispoPara);
        });
    });

    // Fonction pour supprimer une disponibilité
    function deleteDispo(dispoElement) {
        dispoElement.remove();
    }
};