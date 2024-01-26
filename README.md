# Didlydoo App

### description

Didlydoo App se distingue comme une solution web élaborée pour simplifier l'organisation d'événements entre amis et proches. En exploitant Didlydoo, les utilisateurs peuvent explorer, créer, personnaliser et effacer des événements, tout en supervisant aisément la disponibilité de chaque participant. Didlydoo effectue une identification automatique des dates optimales afin d'optimiser la participation à votre événement de manière intuitive.


## Technologies

- **HTML, CSS/SASS, et JavaScript :** Ils constituent l'infrastructure pour la structure, la présentation et le comportement interactif du site.
- **Fetch API :** Utilisé afin de réaliser des requêtes HTTP depuis le navigateur vers le serveur.
- **Vite :** En tant que bundler, il est utilisé pour regrouper et optimiser les fichiers JS et CSS du projet.
- **date-fns :** Intégré pour faciliter la manipulation des dates de manière efficace.
- **Node.js :** Employé pour initialiser le serveur web et assurer la gestion des requêtes HTTP.

## screens

![Capture d'écran 2024-01-26 153900](https://github.com/Dams4953/didlydoo-app/assets/141829372/32df369b-3b7f-46a3-8ad5-07626fa4a3ee)
![Capture d'écran 2024-01-26 155256](https://github.com/Dams4953/didlydoo-app/assets/141829372/8ef89eb3-9f1c-42ba-bd42-a1bc51762b6a)
![Capture d'écran 2024-01-26 154106](https://github.com/Dams4953/didlydoo-app/assets/141829372/ea9f2a5b-c089-4437-848d-19529e1c9fa5)

## collaborateurs

- Alexis
- Joshua
- Damien


## Installation

Clonez le répertoire backend sur votre ordinateur et ouvrez-le dans un terminal, puis tapez npm install une fois pour installer les dépendances.

Pour lancer le serveur, tapez simplement node server/index.mjs pour démarrer le serveur (le terminal doit rester ouvert et opérationnel).

<table>
        <thead>
            <tr>
                <th>Méthode</th>
                <th>Point de terminaison</th>
                <th>Corps</th>
                <th>Réponse</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>GET</td>
                <td>/api/événements/</td>
                <td>Aucun corps requis</td>
                <td>Renvoie une liste de tous les événements</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/events/[identifiant]</td>
                <td>Aucun corps requis</td>
                <td>Renvoie les détails d'un événement spécifique</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/participants/</td>
                <td>Aucun corps requis</td>
                <td>Renvoie une liste de tous les participants et des événements auxquels ils participent</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/attendees/[nom]</td>
                <td>Aucun corps requis</td>
                <td>Renvoie toutes les présences pour un nom donné</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/api/événements/</td>
                <td>{ name: string, dates: array of dates ['YYYY-MM-DD'], author: string, description: string }</td>
                <td>Crée un événement avec les dates comme possibilités. Vous devez fournir un auteur, un nom et une
                    description de l'événement</td>
            </tr>
            <tr>
                <td>PATCH</td>
                <td>/api/events/[id]/</td>
                <td>{ name: string (optional), author: string (optional), description: string (optional) }</td>
                <td>Corrige (modifie) un événement avec les informations fournies</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>/api/events/[id]/</td>
                <td>Aucun corps requis</td>
                <td>Supprime un événement</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/api/events/[id]/add_dates</td>
                <td>{ dates: array of dates ['YYYY-MM-DD'] }</td>
                <td>Ajoute quelques dates possibles à un événement</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/api/events/[id]/attend</td>
                <td>{ name: string, dates: [{ date: date 'YYYY-MM-DD', available: boolean (true/false) }] }</td>
                <td>Ajoute une participation pour l'événement donné. Vous devez fournir le nom du participant et quelques
                    disponibilités, sous forme d'un tableau d'objets</td>
            </tr>
            <tr>
                <td>PATCH</td>
                <td>/api/events/[id]/attend</td>
                <td>{ name: string, dates: [{ date: date 'YYYY-MM-DD', available: boolean (true/false) }] }</td>
                <td>Modifie une participation pour l’événement donné. Vous devez fournir le nom du participant et quelques


                    disponibilités, sous forme d'un tableau d'objets</td>
            </tr>
        </tbody>
    </table>


