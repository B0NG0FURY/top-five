const BASE_URL = "http://localhost:3000"
const CATEGORIES_URL = `${BASE_URL}/categories`

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class List {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

class Item {
    constructor(id, name, rank) {
        this.id = id;
        this.name = name;
        this.rank = rank;
    }
}

document.addEventListener("DOMContentLoaded", () => { 
    getCategories().then(categories => {
        let div = document.querySelector("div.category-select");
        let select = document.createElement("select");
        let option = document.createElement("option");
        option.text = "All";
        select.setAttribute("name", "categories");
        select.appendChild(option);
        categories.forEach(category => {
            addCategory(category, select);
        });
        div.appendChild(select);
        select.addEventListener("change", (e) => {
            e.preventDefault();
            getLists(e.target.value);
        })
    });
})

function getCategories() {
    return fetch(CATEGORIES_URL).then(resp => resp.json());
}

function addCategory(category, element) {
    let cat = new Category(category["id"], category["name"]);
    let option = document.createElement("option");
    option.value = `${cat.id.toString()}`;
    option.text = `${cat.name}`;
    element.appendChild(option);
}

function getLists(e) {
    fetch(`${CATEGORIES_URL}/${parseInt(e)}/lists`).then(resp => resp.json()).then(lists => displayLists(lists));
}

function displayLists(lists) {
    let listDiv = document.createElement("div");
    listDiv.className = "display-lists";
    lists.forEach(listObject => {
        let list = new List(listObject["id"], listObject["title"]);

        let div = document.createElement("div");
        div.setAttribute("class", "list");
        div.setAttribute("data-list-id", `${list.id}`)
        let p = document.createElement("p");
        p.innerText = list.title;
        div.appendChild(p);

        let ol = document.createElement("ol");
        listObject["items_ranked"].forEach(item => {
            ol.appendChild(displayItem(item));
        });
        div.appendChild(ol);

        listDiv.appendChild(div);
    });
    let listContainer = document.querySelector("div.list-container");
    listContainer.innerHTML = listDiv.innerHTML;
}

function displayItem(itemObject) {
    let item = new Item(itemObject["id"], itemObject["name"], itemObject["rank"]);
    let li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-item-id", `${item.id}`);
    li.setAttribute("data-item-rank", `${item.rank}`);
    li.innerText = `${item.name}`;
    rankButtons(item, li);
    return li;
}

function rankButtons(item, li) {
    let rankUp = document.createElement("span");
    rankUp.setAttribute("class", "rank-up");
    rankUp.setAttribute("data-item-id", `${item.id}`);
    rankUp.addEventListener("click", (e) => moveRankUp(e));

    let rankDown = document.createElement("span");
    rankDown.setAttribute("class", "rank-down");
    rankDown.setAttribute("data-item-id", `${item.id}`);
    rankDown.addEventListener("click", (e) => moveRankDown(e.target));

    if (item.rank === 1) {
        li.append(rankDown);
    } else if (item.rank === 5) {
        li.append(rankUp);
    } else {
        li.append(rankDown);
        li.append(rankUp);
    }
}

function moveRankDown(e) {
    let configObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "down_id": parseInt(e.getAttribute("data-item-id")),
            "up_id": parseInt(e.parentElement.nextSibling.getAttribute("data-item-id"))
        })
    }
}