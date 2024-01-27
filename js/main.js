import { deleteItems } from './delete.js';
import { format } from 'date-fns';
import { dispoFunction } from './dispo.js';
import { getEventApi, postEventApi } from './eventsServer.js';
import { editEvent } from './editEvent.js';

let main = document.querySelector('main');

// Appelle fonction EventsApi pour récup liste évents du serveur
const events = await getEventApi();

/// Fonction pour obtenir et afficher données du serveur
async function majEvents() {
    try {
        // mise à jour du html avec les données du serveur
        events.forEach(data => {

            // création div pour chaque évent
            let eventDiv = document.createElement('div');
            eventDiv.className = 'conteneur__idDiv';

            let datesTab = [];


            data.dates.forEach(date => {
                let dateParagraph = document.createElement('p');
                dateParagraph.textContent = `Date : ${date}`;
                datesTab.push(dateParagraph);
            });


            // html de la div
            eventDiv.innerHTML = `<p><b><h3>Nom de l'événement</b> : ${data.name}</h3></p>
                                        <p><span class="material-symbols-outlined">person</span><b> Auteur</b> : ${data.author}</p>
                                        <p><span class="material-symbols-outlined">event_note</span><b> Description</b> : ${data.description}</p>`;

            let dateDiv = document.createElement('div');
            dateDiv.className = 'container-dates';
            eventDiv.appendChild(dateDiv);

            let dateTable = document.createElement('table');
            dateTable.className = 'date-table';
            dateDiv.appendChild(dateTable);

            datesTab.forEach(dateParagraph => {
                let row = dateTable.insertRow();

                let cellule = row.insertCell();
                cellule.className = 'cellules_tab';
                cellule.appendChild(dateParagraph);

                let celluleDispo = row.insertCell();
                celluleDispo.className = 'cellules_dispo_tab';
                
                let divCelluleDispo = document.createElement('div');
                divCelluleDispo.className = 'div_cellules_dispo_tab';
                celluleDispo.appendChild(divCelluleDispo);

                
                
                
            });

            eventDiv.innerHTML += `<form class="conteneur__idDiv__dispo-form">
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
                                        <div class="dispo-list"></div>
                                        <button class="conteneur__idDiv__bouton-edit" onclick="editEvent(div, '${data.name}', '${data.author}', '${data.dates[0]}', '${data.description}')">Éditer</button>
                                        <button class='conteneur__idDiv__bouton-suppression' type="button">Supprimer</button>`;
                                        


            let conteneur = document.querySelector('.conteneur');
            main.appendChild(conteneur);
            conteneur.appendChild(eventDiv);

            // appel fonction pour les disponibilités
            dispoFunction(eventDiv);

            // appel fonction pour modifier
            editEvent();
        });

    } catch (error) {
        console.error('error in majEvents', error);
    }
}

majEvents();

// ajouter dates
let eventDateInput = document.getElementById('event-date');

document.getElementById('add-date').addEventListener('click', function (event) {
    event.preventDefault();

    let datesContainer = document.getElementById('dates-container');

    if (datesContainer && eventDateInput) {

        let newInputDate = eventDateInput.cloneNode(true);

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
    let datesTab = [];
    let formattedEventDate;
    let datesContainer = document.getElementById('dates-container');

    datesContainer.querySelectorAll('.input-ajouts-dates').forEach((dateInput) => {
        formattedEventDate = format(new Date(dateInput.value), 'yyyy-MM-dd');
        let dateParagraph = document.createElement('p');
        dateParagraph.textContent = `Date de l'événement : ${formattedEventDate}`;
        datesTab.push(dateParagraph);
    });

    eventDiv.innerHTML += `<p><b><h3>Nom de l'événement</b> : ${eventName}</h3></p>
                            <p><span class="material-symbols-outlined">person</span><b>Auteur</b> : ${eventAuthor}</p>
                            <p><span class="material-symbols-outlined">event_note</span><b>Description</b> : ${eventDescription}</p>
                            <button class="conteneur__idDiv__bouton-edit" onclick="editEvent(eventDiv, '${eventName}', '${eventAuthor}', '${formattedEventDate}', '${eventDescription}', '${formattedEventDate}')">Éditer</button>
                            <button class='conteneur__idDiv__bouton-suppression' type="button">Supprimer</button>`;


                            let dateDiv = document.createElement('div');
                            dateDiv.className = 'container-dates';
                            eventDiv.appendChild(dateDiv);
                
                            let dateTable = document.createElement('table');
                            dateTable.className = 'date-table';
                            dateDiv.appendChild(dateTable);
                
                            datesTab.forEach(dateParagraph => {
                                let row = dateTable.insertRow();
                
                                let cellule = row.insertCell();
                                cellule.className = 'cellules_tab';
                                cellule.appendChild(dateParagraph);
                
                                let celluleDispo = row.insertCell();
                                celluleDispo.className = 'cellules_dispo_tab';
                                
                                let divCelluleDispo = document.createElement('div');
                                divCelluleDispo.className = 'div_cellules_dispo_tab';
                                celluleDispo.appendChild(divCelluleDispo);
  
                            });


    // html div
    eventDiv.innerHTML += `<form class="conteneur__idDiv__dispo-form">
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

    function extractDatesAndFormat(datesTab) {
        return datesTab.map(dateElement => {

            const dateString = dateElement.textContent.split(': ')[1].trim();
            return format(new Date(dateString), 'yyyy-MM-dd');
        });
    }


    // Envoie les données de la nouvelle div au serveur (POST)
    try {
        const formattedDates = extractDatesAndFormat(datesTab);
        await postEventApi({
            name: eventName,
            description: eventDescription,
            author: eventAuthor,
            dates: formattedDates
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


