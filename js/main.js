import { deleteItems } from './delete.js';
import { format } from 'date-fns';
import { dispoFunction } from './dispo.js';
import { EventsApi, creationEventApi } from './eventsServer.js';
import { editEvent } from './editEvent.js';

let main = document.querySelector('main');

// Fonction pour obtenir et afficher données du serveur
async function majEvents() {
    try {
        // Appelle fonction EventsApi pour récup liste évents du serveur
        const events = await EventsApi();

        // mise à jour du html avec les données du serveur
        events.forEach(data => {

            // création div pour chaque évent
            let eventDiv = document.createElement('div');
            eventDiv.className = 'conteneur__idDiv';

            // html de la div
            eventDiv.innerHTML = `<p>Nom de l'événement : ${data.name}</p>
                                        <p>Auteur : ${data.author}</p>
                                        <p>Date de l'événement : ${data.dates[0]}</p>
                                        <p>Description : ${data.description}</p>
                                        <button onclick="editEvent(div, '${data.name}', '${data.author}', '${data.dates[0]}', '${data.description}')">Éditer</button>
                                        <button class='conteneur__idDiv__bouton-suppression' type="button">Supprimer</button>
                                        <form class="dispo-form">
                                            <label for="dispo">Disponibilité :</label>
                                            <input type="text" name="dispoName" placeholder="Votre nom" required>
                                            <select name="dispoStatus" required>
                                                <option value="disponible">Disponible</option>
                                                <option value="indisponible">Indisponible</option>
                                            </select>
                                            <button type="submit">Ajouter la disponibilité</button>
                                        </form>
                                        <div class="dispo-list"></div>`;
            let conteneur = document.querySelector('.conteneur');
            main.appendChild(conteneur);
            conteneur.appendChild(eventDiv);

            // appel fonction pour la suppression
            deleteItems();

            // appel fonction pour les disponiblités
            dispoFunction(eventDiv);

            // appel fonction pour modifier
            editEvent();
        });

    } catch (error) {

        console.error('error fonction majEvents', error);
    }
}

majEvents();

// fonction bouton créer un événement
document.getElementById('idBouton').addEventListener('click', async function (event) {

    event.preventDefault();

    // Récupère les valeurs du formulaire
    let eventName = document.getElementById('event-name').value;
    let eventAuthor = document.getElementById('event-author').value;
    let eventDate = document.getElementById('event-date').value;
    let eventDescription = document.getElementById('event-description').value;

    // format de la date
    let formatDate = format(new Date(eventDate), 'dd-MM-yyyy');

    // création div à chaque click sur le bouton
    let eventDiv = document.createElement('div');
    eventDiv.className = 'conteneur__idDiv';
    eventDiv.innerHTML = `<p>Nom de l'événement : ${eventName}</p>
                                <p>Auteur : ${eventAuthor}</p>
                                <p>Date de l'événement : ${formatDate}</p>
                                <p>Description : ${eventDescription}</p>
                                <button onclick="editEvent(div, '${eventName}', '${eventAuthor}', '${eventDate}', '${eventDescription}')">Éditer</button>
                                <button class='conteneur__idDiv__bouton-suppression' type="button">Supprimer</button>
                                <form class="dispo-form">
                                    <label for="dispo">Disponibilité :</label>
                                    <input type="text" name="dispoName" placeholder="Votre nom" required>
                                    <select name="dispoStatus" required>
                                        <option value="disponible">Disponible</option>
                                        <option value="indisponible">Indisponible</option>
                                    </select>
                                    <button type="submit">Ajouter la disponibilité</button>
                                </form>
                                <div class="dispo-list"></div>`;
    let conteneur = document.querySelector('.conteneur');
    main.appendChild(conteneur);
    conteneur.appendChild(eventDiv);

    // Envoie les données de la nouvelle div au serveur (POST)
    try {
        await creationEventApi({
            name: eventName,
            dates: [formatDate],
            author: eventAuthor,
            description: eventDescription,
        });

        // appel fonction pour la suppression
        deleteItems();

        // appel fonction pour les disponiblités
        dispoFunction(eventDiv);

        // appel fonction pour modifier
        editEvent();

    } catch (error) {

        console.error('error fonction bouton créer un événement', error);

    }
});