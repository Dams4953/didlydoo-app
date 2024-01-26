// Fonction création d'un évent avec l'api
export async function postDateApi() {
    try {

        const response = await fetch('http://localhost:3000/api/events/[id]/add_dates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        });

        const responseBody = await response.json();

        return responseBody;

    } catch (error) {

        console.error('error fonction postDateApi');

    }
}
