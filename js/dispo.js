// GET api des disponibilités
export async function getDispoApi() {
    try {
        const response = await fetch('http://localhost:3000/api/attendees/');
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('error fonction getDispoApi');
    }
}

// POST api des disponibilités
export async function postDispoApi(eventId) {
    try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}/attend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: dispoName,
                dates: [
                    {
                        date: dispoDate,
                        available: dispoAvailable
                    }
                ]
            }),
        });

        console.log('Response before JSON parsing:', response);
        const responseBody = await response.json();

        return responseBody;
    } catch (error) {
        console.error('error fonction postDispoApi', error);
    }
}

// fonction pour les disponibilités
export async function dispoFunction(eventDiv) {
    let dispoForm = eventDiv.querySelector('.dispo-form');
    let dispoList = eventDiv.querySelector('.dispo-list');

    // affichage données api
    async function displayApiData() {
        try {
            // Récupération des données de l'API
            const events = await getDispoApi();

            if (events && events.length > 0) {
                let eventId = events[0].id;

                // Boucle pour afficher les données de l'API
                events.forEach(data => {
                    let getDispoList = document.createElement('p');
                    getDispoList.className = 'dispo-list__getPara';
                    getDispoList.innerHTML = `${data.name} ${eventId}`;
                    dispoList.appendChild(getDispoList);
                });

                // Marquer que les données ont été affichées
                apiDataDisplayed = true;
            }
        } catch (error) {
            console.error('Error displaying API data', error);
        }
    }

    // Événement de soumission du formulaire
    dispoForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // valeurs du formulaire stockées dans des variables
        let dispoNameInput = dispoForm.querySelector('input[name="dispoName"]').value;
        let dispoStatusInput = dispoForm.querySelector('select[name="dispoStatus"]').value;

        // ajout du paragraphe
        let dispoPara = document.createElement('p');
        dispoPara.textContent = `${dispoNameInput} ${dispoStatusInput}`;
        dispoList.appendChild(dispoPara);

    });

    await displayApiData(); 
}
