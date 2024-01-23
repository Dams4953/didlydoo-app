export function dispoFunction(eventDiv) {
    

    let dispoForm = eventDiv.querySelector('.dispo-form');

    dispoForm.addEventListener('submit', function (event) {

        event.preventDefault();

        // valeurs du formulaire stockées dans des variables
        let dispoNameInput = dispoForm.querySelector('input[name="dispoName"]').value;
        let dispoStatusInput = dispoForm.querySelector('select[name="dispoStatus"]').value;
        let dispoList = eventDiv.querySelector('.dispo-list');

        // ajout du paragraphe
        let dispoPara = document.createElement('p');
        dispoPara.textContent = `${dispoNameInput} ${dispoStatusInput}`;
        dispoList.appendChild(dispoPara);
        

    });

};