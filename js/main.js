import { deleteItems } from './delete.js';
import { format } from 'date-fns';
import { dispoFunction } from './dispo.js';
import { getEventApi, postEventApi } from './eventsServer.js';
import { editEvent } from './editEvent.js';

let main = document.querySelector('main');

// Appelle fonction EventsApi pour récup liste évents du serveur
const events = await getEventApi();

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

// ajouter une date
document.getElementById('add-date').addEventListener('click', function (event) {
    event.preventDefault();

    let datesContainer = document.getElementById('dates-container');

    if (datesContainer) {


        let newInputDate = document.createElement('input');
        newInputDate.className = 'input-ajouts-dates';
        newInputDate.type = 'date';


        datesContainer.appendChild(newInputDate);
    }
});


// créer un événement
document.getElementById('idBouton').addEventListener('click', async function (event) {

    event.preventDefault();

    let eventName = document.getElementById('event-name').value;
    let eventAuthor = document.getElementById('event-author').value;
    let eventDescription = document.getElementById('event-description').value;

    // div
    let eventDiv = document.createElement('div');
    eventDiv.className = 'conteneur__idDiv';

    // dates
    let datesParagraphs = [];
    let formattedDate;

    let eventDate = document.getElementById('event-date').value;
    let datesContainer = document.getElementById('dates-container');


    let formattedEventDate = format(new Date(eventDate), 'dd-MM-yyyy');
    let eventDateParagraph = document.createElement('p');
    eventDateParagraph.textContent = `Date de l'événement: ${formattedEventDate}`;
    datesParagraphs.push(eventDateParagraph);


    // Ajouter chaque date dans un paragraphe différent
    
    datesContainer.querySelectorAll('.input-ajouts-dates').forEach((dateInput, index) => {
        formattedDate = format(new Date(dateInput.value), 'dd-MM-yyyy');
        let dateParagraph = document.createElement('p');
        dateParagraph.textContent = `Date de l'événement ${index + 1}: ${formattedDate}`;
        datesParagraphs.push(dateParagraph);
    });

    // Ajouter tous les paragraphes de date à eventDiv
    datesParagraphs.forEach(dateParagraph => {
        eventDiv.appendChild(dateParagraph);
    });

    // html div
    eventDiv.innerHTML = `<p><b><h3>Nom de l'événement</b> : ${eventName}</h3></p>
                            <p><span class="material-symbols-outlined">person</span><b>Auteur</b> : ${eventAuthor}</p>
                           
                            <p><span class="material-symbols-outlined">event_note</span><b>Description</b> : ${eventDescription}</p>
                            <button class="conteneur__idDiv__bouton-edit" onclick="editEvent(eventDiv, '${eventName}', '${eventAuthor}', '${formattedEventDate}', '${formattedDate}', '${eventDescription}')">Éditer</button>
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
        await postEventApi({
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


// appel fonction pour la suppression
deleteItems(events);


