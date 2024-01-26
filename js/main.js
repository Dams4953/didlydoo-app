import { deleteItems } from './delete.js';
import { format } from 'date-fns';
import { dispoFunction } from './dispo.js';
import { EventsApi, creationEventApi } from './eventsServer.js';
import { editEvent } from './editEvent.js';

let main = document.querySelector('main');

// Appelle fonction EventsApi pour récup liste évents du serveur
const events = await EventsApi();

// Fonction pour obtenir et afficher données du serveur
async function majEvents() {
    
    try {

        // mise à jour du html avec les données du serveur
        events.forEach(data => {

            // création div pour chaque évent
            let eventDiv = document.createElement('div');
            eventDiv.className = 'conteneur__idDiv';

            // html de la div
            eventDiv.innerHTML = `<p><b><h3>Nom de l'événement</b> : ${data.name}</h3></p>
                                        <p><span class="material-symbols-outlined">person</span><b> Auteur</b> : ${data.author}</p>
                                        <p><span class="material-symbols-outlined">calendar_month</span><b> Date de l'événement</b> : ${data.dates[0]}</p>
                                        <p><span class="material-symbols-outlined">event_note</span><b> Description</b> : ${data.description}</p>
                                        <button class="conteneur__idDiv__bouton-edit" onclick="editEvent(div, '${data.name}', '${data.author}', '${data.dates[0]}', '${data.description}')">Éditer</button>
                                        <button class='conteneur__idDiv__bouton-suppression' type="button">Supprimer</button>
                                        <form class="conteneur__idDiv__dispo-form">
                                            <label for="conteneur__idDiv__dispo-form">Disponibilité :</label>
                                            <input type="text" name="dispoName" placeholder="Votre nom" required>
                                            <select name="dispoStatus" required>
                                                <option value="disponible">Disponible</option>
                                                <option value="indisponible">Indisponible</option>
                                            </select>
                                            <button class="conteneur__idDiv__dispo-form__edit" type="submit"><span class="material-symbols-outlined">
                                            add
                                            </span></button>
                                        </form>
                                        <div class="dispo-list"></div>`;
            let conteneur = document.querySelector('.conteneur');
            main.appendChild(conteneur);
            conteneur.appendChild(eventDiv);

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
    let formatDate = format(new Date(eventDate), 'yyyy-MM-dd');

    // création div à chaque click sur le bouton
    let eventDiv = document.createElement('div');
    eventDiv.className = 'conteneur__idDiv';
    eventDiv.innerHTML = `<p><b><h3>Nom de l'événement</b> : ${eventName}</h3></p>
                                <p><span class="material-symbols-outlined">person</span><b>Auteur</b> : ${eventAuthor}</p>
                                <p><span class="material-symbols-outlined">calendar_month</span><b>Date de l'événement</b> : ${formatDate}</p>
                                <p><span class="material-symbols-outlined">event_note</span><b>Description</b> : ${eventDescription}</p>
                                <button class="conteneur__idDiv__bouton-edit" onclick="editEvent(div, '${eventName}', '${eventAuthor}', '${eventDate}', '${eventDescription}')">Éditer</button>
                                <button class='conteneur__idDiv__bouton-suppression' type="button">Supprimer</button>
                                <form class="conteneur__idDiv__dispo-form">
                                    <label for="conteneur__idDiv__dispo-form">Disponibilité :</label>
                                    <input type="text" name="dispoName" placeholder="Votre nom" required>
                                    <select name="dispoStatus" required>
                                        <option value="disponible">Disponible</option>
                                        <option value="indisponible">Indisponible</option>
                                    </select>
                                    <button class="conteneur__idDiv__dispo-form__edit" type="submit"><span class="material-symbols-outlined">
                                    add
                                    </span></button>
                                </form>
                                <div class="dispo-list"></div>`;
    let conteneur = document.querySelector('.conteneur');
    main.appendChild(conteneur);
    conteneur.appendChild(eventDiv);

    // Envoie les données de la nouvelle div au serveur (POST)
    try {
        await creationEventApi({
            name: eventName,
            description: eventDescription,
            author: eventAuthor,
            dates: [formatDate],
        });

        // appel fonction pour les disponiblités
        dispoFunction(eventDiv);

        // appel fonction pour modifier
        editEvent();

    } catch (error) {

        console.error('error fonction bouton créer un événement', error);

    }
});

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

    };


// appel fonction pour la suppression
deleteItems(events);
