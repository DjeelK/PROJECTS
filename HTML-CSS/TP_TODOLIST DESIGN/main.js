import Item from "./classes.js/Item.js";

// class Item {
//     constructor(titre,contenu){
//         this.id = ++itemCount;
//         this.titre=titre;
//         this.contenu=contenu;
//         this.isDone = false;
//     }
// }

let items = []
let searchedItems = []
let searchText = ""

//Assignation touche/boutton&input
const todoAddForm = document.querySelector("#todoForm")
const addItemButton = document.querySelector("#button-submit");
const searchItemButton = document.querySelector("#button-submit-search");
const addTitreInput = document.querySelector("#add-titre-input");
const addContenuInput = document.querySelector("#add-contenu-input");
const searchTitreInput = document.querySelector("#add-titre-search-input");
const resTableBody = document.querySelector ("#tableBody");
// console.log(addItemButton,searchItemButton,addTitreInput,addContenuInput,searchTitreInput)

const renderItems = () => {
    resTableBody.innerHTML = ``

searchedItems = items.filter(x => x.titre.includes(searchText));

for (const item of searchedItems ) {
    resTableBody.innerHTML += `
    <tr>
    <td>${item.id}</td>
    <td>${item.titre}</td>
    <td>${item.contenu}</td>
    <td class="d-flex justify-content-center">
    <button class="btn btn-light" onclick="deleteItem(${item.id})"><i class="bi bi-trash"></i></button>
    ${item.isDone ? 
    (`<button class="btn btn-light ms-3" onclick="switchItem(${item.id})"><i class="bi bi-check-circle"></i></button>`)
    : 
    (`<button class="btn btn-light ms-3" onclick="switchItem(${item.id})"><i class="bi bi-clock"></i></button>`)}
    </td>
    </tr>
    `
    }
}

const addItemToList = (itemTitle, itemContent) => {
    return new Promise((res, rej) => {
    setTimeout(() => {
        if (items.find(x => x.titre === itemTitle&& x.content === itemContent)) {
        rej(new Error("Cette tâche est déjà dans la liste !"))
        } else {
        items.push(new Item (itemTitle, itemContent))
        res();
        }
    }, 1000)
    })
}

const removeItemFromList = (itemId) => {
    return new Promise((res, rej) => {
    setTimeout(() => {
        let foundItem = items.find(x => x.id === itemId)
        if (foundItem) {
        items.splice(items.indexOf(foundItem), 1)
        res()
        } else {
        rej(new Error("Cette tâche n'existe pas !"))
        }
    }, 1000)
    })
}


const switchItemStatus = (itemId) => {
    return new Promise((res, rej) => {
    setTimeout(() => {
        let foundItem = items.find(x => x.id === itemId)
        if (foundItem) {
            foundItem.isDone = !foundItem.isDone
        res()
        } else {
        rej(new Error("Cette tâche n'existe pas !"))
        }
    }, 1000)
    })
}

todoAddForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
    await addItemToList(addTitreInput.value, addContenuInput.value);
    renderItems();
    } catch (error) {
    console.error(error);
    }
})

searchTitreInput.addEventListener('input', (e) => {
    searchText = e.target.value
    renderItems();
})

searchItemButton.addEventListener('submit', async (e) => {
    e.preventDefault()
    searchText = searchTitreInput.value
    renderItems();
})

window.deleteItem = async (itemId) => {
    await removeItemFromList(itemId);
    renderItems();
}

window.switchItem = async (itemId) => {
    await switchItemStatus(itemId);
    renderItems();
}