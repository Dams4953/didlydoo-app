import { dispoFunction } from './dispo.js';


export async function eventsServerFunction(eventDiv) {
    try {
  
        const response = await fetch('http://localhost:3000/api/events');
        const events = await response.json();

        
        events.forEach(data => {
            
            const serverDiv = document.createElement('div');
            serverDiv.id = data.id;

            // création du html
            const eventServerHtml = `
                <p>Nom de l'événement : ${data.name}</p>
                <p>Auteur : ${data.author}</p>
                <p>Date de l'événement : ${data.dates[0].date}</p>
                <p>Description : ${data.description}</p>
                <form class="dispo-form">
                    <label for="dispo">Disponibilité :</label>
                    <input type="text" name="dispoName" placeholder="Votre nom" required>
                    <select name="dispoStatus" required>
                        <option value="disponible">Disponible</option>
                        <option value="indisponible">Indisponible</option>
                        <!-- Ajoutez une option par défaut si nécessaire -->
                        <option value="default" selected>Choisissez une disponibilité</option>
                    </select>
                    <button type="submit">Ajouter la disponibilité</button>
                </form>
                <div class="dispo-list"></div>
            `;
            serverDiv.innerHTML = eventServerHtml;
            eventDiv.appendChild(serverDiv);

            // appel de la fonction des disponibilités injecté dans la div serverDiv
            dispoFunction(serverDiv);
        });

    

    } catch (error) {
        
        console.error('erreur api events');
    }
}
