let photoRecords = JSON.parse(localStorage.getItem('photos')) || [];
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const tableBody = document.getElementById('table-body');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');

// Acesso à câmera
async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
}

document.getElementById('capture').addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    savePhoto(imageData);
});

document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        savePhoto(reader.result);
    }
    reader.readAsDataURL(file);
});

document.getElementById('get-location').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            latitudeInput.value = position.coords.latitude;
            longitudeInput.value = position.coords.longitude;
        });
    } else {
        alert("Geolocalização não é suportada por este navegador.");
    }
});

document.getElementById('save').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;

    if (title) {
        const newRecord = {
            id: Date.now(),
            title,
            description,
            latitude,
            longitude,
            date: new Date().toLocaleString(),
            image: canvas.toDataURL('image/png'),
        };
        photoRecords.push(newRecord);
        localStorage.setItem('photos', JSON.stringify(photoRecords));
        displayPhotos();
        clearInputs();
    } else {
        alert("Título é obrigatório.");
    }
});

function displayPhotos() {
    tableBody.innerHTML = '';
    photoRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.title}</td>
            <td>${record.description}</td>
            <td>${record.latitude}, ${record.longitude}</td>
            <td>${record.date}</td>
            <td>
                <button onclick="viewDetails(${record.id})">Ver</button>
                <button onclick="deletePhoto(${record.id})">Excluir</button>
                <button onclick="editPhoto(${record.id})">Editar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function viewDetails(id) {
    const record = photoRecords.find(photo => photo.id === id);
    alert(`Título: ${record.title}\nDescrição: ${record.description}\nLocalização: ${record.latitude}, ${record.longitude}\nData: ${record.date}`);
}

function deletePhoto(id) {
    const confirmation = confirm("Tem certeza que deseja excluir esta foto?");
    if (confirmation) {
        photoRecords = photoRecords.filter(photo => photo.id !== id);
        localStorage.setItem('photos', JSON.stringify(photoRecords));
        displayPhotos();
    }
}

function editPhoto(id) {
    const record = photoRecords.find(photo => photo.id === id);
    document.getElementById('title').value = record.title;
    document.getElementById('description').value = record.description;
    latitudeInput.value = record.latitude;
    longitudeInput.value = record.longitude;

    deletePhoto(id); // Excluir após carregar os dados para editar
}

function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    latitudeInput.value = '';
    longitudeInput.value = '';
}

setupCamera();
displayPhotos();
