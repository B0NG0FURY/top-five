const BASE_URL = "http://localhost:3000"
const CATEGORIES_URL = `${BASE_URL}/categories`

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

document.addEventListener("DOMContentLoaded", () => { 
    getCategories().then(categories => {
        let div = document.querySelector("div.category-select");
        let select = document.createElement("select");
        select.setAttribute("name", "categories");
        categories.forEach(category => {
            addCategory(category, select);
        });
        div.appendChild(select);
    });
})

function getCategories() {
    return fetch(CATEGORIES_URL).then(resp => resp.json());
}

function addCategory(category, element) {
    let cat = new Category(category["id"], category["name"]);
    let option = document.createElement("option");
    option.value = `${cat.name}`;
    option.text = `${cat.name}`;
    element.appendChild(option);
}