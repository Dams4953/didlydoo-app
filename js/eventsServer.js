export async function EventsApi() {
    try {

        const response = await fetch('http://localhost:3000/api/events/');
        const events = await response.json();

        return events;

    } catch (error) {

        console.error('error fonction EventsApi');

    }
}

// Fonction création d'un évent avec l'api
export async function creationEventApi(eventData) {
    try {
        console.log('Data being sent to the server:', eventData);
        const response = await fetch('http://localhost:3000/api/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        const responseBody = await response.json();

        return responseBody;

    } catch (error) {

        console.error('error fonction creationEventApi');

    }
}
