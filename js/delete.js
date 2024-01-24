// fonction qui va chercher l'api pour delete
export async function deleteEvent(eventId) {
    try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('error fonction deleteEvent', error);
    }
}


// function pour delete
export function deleteItems(events) {
    let boutonsSupprimer = document.querySelectorAll('.conteneur__idDiv__bouton-suppression');
    boutonsSupprimer.forEach((bouton, index) => {
        bouton.addEventListener('click', async function () {
            try {
                const eventId = events[index].id;

                await deleteEvent(eventId);
                
                bouton.parentElement.remove();

            } catch (error) {
                console.error('Erreur lors de la suppression côté client', error);
            }
        });
    });
}
