import { format } from 'date-fns';
import { dispoFunction } from './dispo.js';
import { eventsServerFunction } from './eventsServer.js';

let main = document.querySelector('main');

// fonction pour prendre données du serveur
eventsServerFunction(main);

// fonction bouton créer évènement
document.getElementById('idBouton').addEventListener('click', async function (event) {

    event.preventDefault();

    // valeurs du formulaire stockées dans des variables
    let eventName = document.getElementById('event-name').value;
    let eventAuthor = document.getElementById('event-author').value;
    let eventDate = document.getElementById('event-date').value;
    let eventDescription = document.getElementById('event-description').value;

    // format date
    let formattedDate = format(new Date(eventDate), 'dd/MM/yyyy');

    // création de la div après le click
    let eventDiv = document.createElement('div');
    eventDiv.className = 'idDiv';
    eventDiv.innerHTML = `<p>Nom de l'événement : ${eventName}</p>
                                <p>Auteur : ${eventAuthor}</p>
                                <p>Date de l'événement : ${formattedDate}</p>
                                <p>Description : ${eventDescription}</p>
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
    main.appendChild(eventDiv);

    // fonction pour ajouter disponibilités
    dispoFunction(eventDiv);
});

