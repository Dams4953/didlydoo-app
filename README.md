# Didlydoo App


## Technologies


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

