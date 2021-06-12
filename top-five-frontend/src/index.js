const BASE_URL = "http://localhost:3000"
const CATEGORIES_URL = `${BASE_URL}/categories`

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

document.addEventListener("DOMContentLoaded", () => {

})

function getCategories() {
    return fetch(CATEGORIES_URL).then(resp => resp.json());
}