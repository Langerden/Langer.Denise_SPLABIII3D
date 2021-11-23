function createTable(data) {
    const table = document.createElement("table");
    table.appendChild(createThead(data[0]));
    data.forEach(item => {
        table.appendChild(createTbody(item));
    });
    document.getElementById("divTabla").appendChild(table);
}

function createThead(data) {
    const thead = document.createElement("thead");
    const keys = Object.keys(data);
    const tr = document.createElement("tr");
    tr.style.backgroundColor = "#2D3EF6";

    keys.forEach(item => {
        if (item !== "id") {
            const th = document.createElement("th");
            const text = document.createTextNode(item);
            th.appendChild(text);
            tr.appendChild(th);
        }
    });
    return thead.appendChild(tr);
}

function createTbody(data) {
    const tbody = document.createElement("tbody");
    const values = Object.values(data);
    const tr = document.createElement("tr");

    values.forEach(item => {
        if (item !== data.id) {
            const td = document.createElement("td");
            td.textContent = item;
            tr.appendChild(td);
        } else {
            tr.setAttribute("id", item); //Si es el id, lo pongo como atributo de la fila
        }
    });
    if (data.id % 2) {
        tr.style.backgroundColor = "#ABB2F6";
    } else {
        tr.style.backgroundColor = "#d8d4d4";
    }
    return tbody.appendChild(tr);
}


function updateTable(data) {
    if (data.length > 0) {
        const table = document.getElementById("divTabla");
        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        createTable(data);
    }
}


export { createTable, updateTable };


