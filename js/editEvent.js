export function editEvent (editEvent){

// Fonction pour éditer un événement

function editEvent(eventDiv, eventName, eventAuthor, eventDate, eventDescription) {
    // Mettre à jour les champs du formulaire avec les valeurs existantes
    document.getElementById('event-name').value = eventName;
    document.getElementById('event-author').value = eventAuthor;
    document.getElementById('event-date').value = eventDate;
    document.getElementById('event-description').value = eventDescription;

    // Modifier le comportement du bouton pour mettre à jour plutôt que de créer
    document.getElementById('idBouton').onclick = function(event) {
        event.preventDefault();
        // Mettre à jour le div de l'événement
        eventDiv.innerHTML = `<p>Nom de l'événement : ${document.getElementById('event-name').value}</p>
                              <p>Auteur : ${document.getElementById('event-author').value}</p>
                              <p>Date de l'événement : ${document.getElementById('event-date').value}</p>
                              <p>Description : ${document.getElementById('event-description').value}</p>
                              <button onclick="editEvent(eventDiv, '${document.getElementById('event-name').value}', '${document.getElementById('event-author').value}', '${document.getElementById('event-date').value}', '${document.getElementById('event-description').value}')">Éditer</button>`;
    };
}}
