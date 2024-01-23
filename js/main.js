document.getElementById('idBouton').addEventListener('click', function (event) {

    event.preventDefault();

    // valeurs du formulaire stockées dans des variables
    let eventName = document.getElementById('event-name').value;
    let eventAuthor = document.getElementById('event-author').value;
    let eventDate = document.getElementById('event-date').value;
    let eventDescription = document.getElementById('event-description').value;

    // création de la div après le click
    let div = document.createElement('div');
    div.innerHTML = `<p>Nom de l'événement : ${eventName}</p>
                        <p>Auteur : ${eventAuthor}</p>
                        <p>Date de l'événement : ${eventDate}</p>
                        <p>Description : ${eventDescription}</p>`;
    let main = document.querySelector('main');
    main.appendChild(div);




});

