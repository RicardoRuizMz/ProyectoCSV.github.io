let csvDataArray = [];

function parseCSV(csvData) {
    csvDataArray = csvData.split('\n').map(row => row.split(','));
    const tableBody = document.querySelector('#CsvTable tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

    csvDataArray.forEach(columns => {
        const tr = document.createElement('tr');
        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = column;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

function readCSV(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const csvData = e.target.result;
        parseCSV(csvData);
    }
    reader.readAsText(file);
}

document.querySelector('#csvFileInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    readCSV(file);
});

function insertData() {
    const newData = prompt('Ingrese los datos a insertar en el formato "Nombre,Correo,Edad":');
    if (newData) {
        const newDataArray = newData.split(',');
        csvDataArray.push(newDataArray);

        const tableBody = document.querySelector('#CsvTable tbody');
        const tr = document.createElement('tr');
        newDataArray.forEach(column => {
            const td = document.createElement('td');
            td.textContent = column;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    }
}

function deleteData() {
    const key = prompt('Ingrese el índice de la columna (comenzando desde 0) del dato a borrar:');
    const value = prompt('Ingrese el valor exacto del dato a borrar en la columna seleccionada:');
    if (key && value) {
        csvDataArray = csvDataArray.filter(row => row[parseInt(key)] !== value);

        const tableBody = document.querySelector('#CsvTable tbody');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas
        csvDataArray.forEach(columns => {
            const tr = document.createElement('tr');
            columns.forEach(column => {
                const td = document.createElement('td');
                td.textContent = column;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }
}

function saveCSV() {
    const csvContent = csvDataArray.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'updated_data.csv';
    a.click();
}

        
