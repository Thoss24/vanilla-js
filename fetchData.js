
const fetchData = async () => {
    const response = await fetch('https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/events.json');

    if (!response.ok) {
        throw new Error("Could not retrieve events data!")
    }

    const data = await response.json();

    return data
};

const fetchEventData = async (id) => {
    const response = await fetch(`https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`);

    if (!response.ok) {
        throw new Error("Could not retrieve event data!")
    }

    const data = await response.json();

    return data
};

const editEventRequest = async (id, data) => {
    console.log(id, data)
    await fetch(`https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
};

const appendData = (data) => {
    const eventsListDiv = document.getElementById('events-list');
    const dataEntries = Object.entries(data);

    dataEntries.forEach((event) => {
        const eventDiv = document.createElement('div');
        eventDiv.addEventListener('click', () => {
            getEventData(event[0])
        });
        eventDiv.classList.add('event-item');
        const eventName = document.createElement('h1');
        eventName.textContent = event[1].name;
        const eventDate = document.createElement('h1');
        eventDate.textContent = event[1].date;
        eventDiv.append(eventName, eventDate);
        eventsListDiv.append(eventDiv);
    });

    return eventsListDiv
};

const getEventData = async (id) => {
    const eventData = await fetchEventData(id);
    const editEventForm = document.getElementById('event-details');
    editEventForm.style.display = "flex";
    const nameInput = document.getElementById('input-name');
    nameInput.defaultValue = eventData.name;
    const dateInput = document.getElementById('input-date');
    dateInput.defaultValue = eventData.date;

    editEventForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const dataObj = {
            name: nameInput.value,
            date: dateInput.value
        };
        editEventRequest(id, dataObj);
    });
}

const fetchAndAppend = async () => {
    const eventsData = await fetchData();

    appendData(eventsData)
};
fetchAndAppend()