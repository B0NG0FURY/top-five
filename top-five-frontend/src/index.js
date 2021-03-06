const BASE_URL = "http://localhost:3000"
const CATEGORIES_URL = `${BASE_URL}/categories`
const LISTS_URL = `${BASE_URL}/lists`
const BODY_IMG = "url('./assets/images/paper-background.png')";

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

class formElement {
    constructor(form) {
        this.form = form;
    }

    get inputs() {
        let inputs = this.form.querySelectorAll("input");
        return Array.from(inputs);
    }

    get items() {
        return this.inputs.slice(2);
    }

    get categorySelect() {
        return parseInt(this.form.querySelector("select").value);
    }

    get newCategory() {
        return this.inputs[0].value;
    }

    get title() {
        return this.inputs[1].value;
    }

    item(i) {
        return this.items[i].value;
    }

    item_rank(i) {
        return parseInt(this.items[i].getAttribute("item-rank"));
    }

}

class EditListElement {
    constructor(element) {
        this.element = element;
    }

    get id() {
        return parseInt(this.element.getAttribute("data-list-id"));
    }

    get title() {
        return this.element.firstChild.firstChild.value;
    }

    get items() {
        return this.element.querySelectorAll("li")
    }

    item_id(i) {
        return parseInt(this.items[i].getAttribute("data-item-id"));
    }

    item(i) {
        return this.items[i].firstChild.value;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    nightModeBtn();

    let newDiv = document.querySelector("div.new-list");
        let newBtn = document.createElement("button");
        newBtn.setAttribute("class", "new-list-btn");
        newBtn.innerText = "Create New List";
        newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            newListForm();
        });
        newDiv.appendChild(newBtn);

    getCategories().then(categories => {
        let div = document.querySelector("div.category-select");
        div.innerHTML = "";
        let select = document.createElement("select");
        let option = document.createElement("option");
        option.value = "Recent";
        option.text = "Most Recent";
        select.setAttribute("name", "categories");
        select.setAttribute("id", "categories");
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

    getLists("Recent");
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
    if (e === "Recent") {
        fetch(LISTS_URL).then(resp => resp.json()).then(lists => displayAllLists(lists));
    } else {
        fetch(`${CATEGORIES_URL}/${parseInt(e)}/lists`).then(resp => resp.json()).then(lists =>  displayAllLists(lists));
    }
}

function displayAllLists(lists) {
    let listContainer = document.querySelector("div.list-container");
    listContainer.innerHTML = "";
    lists.forEach(listObject => {
        displayList(listObject, listContainer);
    });
}

function displayList(listObject, listContainer) {
    let list = new List(listObject["id"], listObject["title"]);

    let div = document.createElement("div");
    div.setAttribute("class", "list");
    div.setAttribute("data-list-id", `${list.id}`)
    
    makeListElement(div, list, listObject);
    listContainer.append(div);
}

function makeListElement(div, list, listObject) {
    let p = document.createElement("p");
        p.innerText = list.title;

        let edit = document.createElement("button");
        edit.setAttribute("class", "edit");
        edit.innerText = "Edit";
        edit.addEventListener("click", (e) => editList(e.target));
        edit.style.display = "block";

        let ol = document.createElement("ol");
        listObject["items_ranked"].forEach(item => {
            displayItem(item, ol);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "delete-list");
        deleteBtn.setAttribute("data-list-id", `${list.id}`);
        deleteBtn.innerText = "Delete";
        deleteBtn.style.display = "none";

        let submit = document.createElement("button");
        submit.setAttribute("class", "edit-submit");
        submit.setAttribute("data-list-id", `${list.id}`);
        submit.innerText = "Submit";
        submit.style.display = "none";
        div.append(p, edit, ol, deleteBtn, submit);
}

function displayItem(itemObject, listElement) {
    let item = new Item(itemObject["id"], itemObject["name"], itemObject["rank"]);
    let li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-item-id", `${item.id}`);
    li.setAttribute("data-item-rank", `${item.rank}`);
    li.innerText = `${item.name}`;
    li.addEventListener("click", (e) => selectListItem(e.target));
    listElement.appendChild(li);
}

function selectListItem(e) {
    toggleSelect(e);

    if (e.tagName === "LI" && e.classList.contains("selected")) {
        let siblings = Array.from(e.parentElement.children);
        siblings.filter(li => li !== e).forEach(li => li.classList.remove("selected"));
        removeRankButtons(e.parentElement.parentElement);
        rankButtons(e);
    } else {
        let list = e.parentElement.parentElement;
        removeRankButtons(list);
    }
}

// li elements can only be selected when not in edit mode
function toggleSelect(li) {
    if (li.children.length === 0) {
        li.classList.toggle("selected");
    }
}

function rankButtons(li) {
    let rankUp = document.createElement("button");
    rankUp.setAttribute("class", "swap-rank");
    rankUp.setAttribute("id", "rank-up");

    let rankDown = document.createElement("button");
    rankDown.setAttribute("class", "swap-rank");
    rankDown.setAttribute("id", "rank-down");

    li.parentElement.parentElement.append(rankDown, rankUp);

    if (li.getAttribute("data-item-rank") == 1) {
        rankUp.disabled = true;
    } else if (li.getAttribute("data-item-rank") == 5) {
        rankDown.disabled = true;
    }
    rankUp.addEventListener("click", (e) => swapRank(e.target));
    rankDown.addEventListener("click", (e) => swapRank(e.target));
}

function removeRankButtons(list) {
    Array.from(list.querySelectorAll(".swap-rank")).forEach(btn => btn.remove());
}

function swapRank(e) {
    let higherRank;
    let lowerRank;
    if (e.id === "rank-down") {
        higherRank = e.parentElement.querySelector(".selected");
        lowerRank = higherRank.nextSibling;
    } else if (e.id === "rank-up") {
        lowerRank = e.parentElement.querySelector(".selected");
        higherRank = lowerRank.previousSibling;
    }

    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "down_id": parseInt(higherRank.getAttribute("data-item-id")),
            "up_id": parseInt(lowerRank.getAttribute("data-item-id")),
        })
    }

    fetch(`${BASE_URL}/items/swap`, configObject).then(resp => resp.json()).then(items => {
        higherItem = new Item(items[0]["id"], items[0]["name"], items[0]["rank"]);
        lowerItem = new Item(items[1]["id"], items[1]["name"], items[1]["rank"]);

        higherRank.setAttribute("data-item-rank", `${higherItem.rank}`);
        higherRank.setAttribute("data-item-id", `${higherItem.id}`);
        higherRank.innerText = `${higherItem.name}`;

        lowerRank.setAttribute("data-item-rank", `${lowerItem.rank}`);
        lowerRank.setAttribute("data-item-id", `${lowerItem.id}`);
        lowerRank.innerText = `${lowerItem.name}`;

        e.id === "rank-down" ? higherRank.nextSibling.click() : lowerRank.previousSibling.click()
    });
}

function editList(e) {
    let title = e.previousSibling;
    let ol = e.nextSibling;

    e.style.display = "none";
    editInput(title);
    ol.childNodes.forEach(li => editInput(li));

    let deleteBtn = e.parentElement.querySelector("button.delete-list");
    deleteBtn.style.display = "inline";
    let listId = parseInt(deleteBtn.getAttribute("data-list-id"));
    deleteBtn.addEventListener("click", (e) => deleteList(e.target));
    
    let submit = e.parentElement.querySelector("button.edit-submit");
    submit.style.display = "inline";
    submit.addEventListener("click", (e) => updateList(e.target));
}

function editInput(element) {
    if (element.classList.contains("selected")) {
        element.click();
    }
    let text = element.innerText;
    let input = document.createElement("input");
    if (element.tagName === "LI") {
        let attribute = "item_id";
        let id = element.getAttribute("data-item-id");
        input.setAttribute(attribute, id);
    }
    input.setAttribute("value", `${text}`);
    element.innerHTML = "";
    element.className = "edit-item";
    element.append(input);
}

function deleteList(e) {
    let list = e.parentElement;
    let listId = parseInt(list.getAttribute("data-list-id"));

    let configObject = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "list_id": listId
        })
    }

    fetch(`${LISTS_URL}/${listId}`, configObject).then(resp => resp.json()).then(resp => console.log(resp.success))
    list.remove();
}

function updateList(e) {
    let list = new EditListElement(e.parentElement);

    let configObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "list": {
                "title": list.title,
                "items_attributes": [
                    { "id": list.item_id(0), "name": list.item(0) },
                    { "id": list.item_id(1), "name": list.item(1) },
                    { "id": list.item_id(2), "name": list.item(2) },
                    { "id": list.item_id(3), "name": list.item(3) },
                    { "id": list.item_id(4), "name": list.item(4) }
                ]
            }
        })
    }

    fetch(`${LISTS_URL}/${list.id}`, configObject).then(resp => resp.json()).then(listObject => {
        let updatedList = new List(listObject["id"], listObject["title"]);
        list.element.innerHTML = "";
        makeListElement(list.element, updatedList, listObject);
    });
}

function newListForm() {
    let div = document.querySelector("div.new-list-form");
    if (div.innerHTML !== "") {
        div.innerHTML = "";
        return;
    }
    let form = document.createElement("form");

    function addBr() {
        return document.createElement("br");
    }

    getCategories().then(categories => {
        let categoryLabel = document.createElement("label");
        categoryLabel.setAttribute("name", "assign-category");
        categoryLabel.innerText = "Category";
        let select = document.createElement("select");
        select.setAttribute("name", "assign-category");
        select.setAttribute("class", "assign-category");
        let option = document.createElement("option");
        option.text = "Select Existing Category:";
        let optionValue = 0;
        option.value = `${optionValue.toString()}`;
        select.appendChild(option);
        categories.forEach(category => addCategory(category, select));
        let newCategory = document.createElement("input");
        newCategory.setAttribute("name", "assign-category");
        newCategory.setAttribute("placeholder", "Create New Category");
        newCategory.setAttribute("id", "form-space");
        form.append(categoryLabel, addBr(), select, addBr(), newCategory, addBr());

        select.addEventListener("change", (e) => {
            e.preventDefault();
            if (e.target.value !== "0") {
                newCategory.style.borderBottomColor = "gray";
                newCategory.setAttribute("disabled", "disabled");
            } else {
                newCategory.removeAttribute("disabled");
                newCategory.style.borderBottomColor = "black";
            }
        });

        newCategory.addEventListener("input", (e) => {
            e.preventDefault();
            if (e.target.value.length > 0) {
                select.setAttribute("disabled", "disabled");
            } else {
                select.removeAttribute("disabled");
            }
        });

        addTitleInput();
        addItemInputs();
    });

    function addTitleInput() {
        let titleLabel = document.createElement("label")
        titleLabel.setAttribute("for", "title")
        titleLabel.innerText = "Title";
        let title = document.createElement("input");
        title.setAttribute("name", "title");
        title.setAttribute("placeholder", "New List Title");
        title.setAttribute("id", "form-space")
        form.append(titleLabel, addBr(), title, addBr());
    }

    function addItemInputs() {
        let itemsLabel = document.createElement("label");
        itemsLabel.setAttribute("name", "items");
        itemsLabel.innerText = "Items";
        form.append(itemsLabel, addBr());

        for (let i = 1; i < 6; i++) {
            let input = document.createElement("input");
            input.setAttribute("item-rank", i.toString());
            input.setAttribute("name", "items");
            input.setAttribute("placeholder", `Item #${i}`);
            form.append(input, addBr());
        }

        let saveBtn = document.createElement("button");
        saveBtn.setAttribute("class", "save-list-button");
        saveBtn.innerText = "Save";
        saveBtn.addEventListener("click", (e) => {
            e.preventDefault();
            createNewList(e.target)
        });
        form.append(saveBtn);
    }
    div.appendChild(form);
}

function createNewList(e) {
    let form = new formElement(e.parentElement);
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "category": {
                "name": form.newCategory
            },
            "category_id": form.categorySelect,
            "list": {
                "title": form.title,
                "items_attributes": [
                    { "name": form.item(0), "rank": form.item_rank(0) },
                    { "name": form.item(1), "rank": form.item_rank(1) },
                    { "name": form.item(2), "rank": form.item_rank(2) },
                    { "name": form.item(3), "rank": form.item_rank(3) },
                    { "name": form.item(4), "rank": form.item_rank(4) }
                ]
            }
        })
    }

    fetch(`${LISTS_URL}`, configObject).then(resp => resp.json()).then(listObject => {
        e.parentElement.parentElement.innerHTML = "";
        addNewCategory(form.newCategory, listObject["category_id"]);
        displayNewList(listObject);
    }).catch(() => {
        let error = document.createElement("p");
        error.innerText = "List failed to save. Make sure you have a category and a title for the list."
        e.parentElement.parentElement.prepend(error);
    });
}

function addNewCategory(newCategory, id) {
    if (newCategory.length > 0) {
        let select = document.querySelector("select#categories");
        let category = {"id": id, "name": newCategory};
        addCategory(category, select);
    }
}

function displayNewList(listObject) {
    let listContainer = document.querySelector("div.list-container");
    listContainer.innerHTML = "";
    displayList(listObject, listContainer);
}

function nightModeBtn() {
    let btn = document.createElement("button");
    btn.innerText = "Night Mode";
    btn.className = "night-mode";
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleNightMode(e);
    })
    let div = document.createElement("div");
    div.append(btn);
    let main = document.querySelector("main");
    main.prepend(div);
}

function toggleNightMode(e) {
    let body = document.querySelector("body");
    if (body.style.backgroundColor !== "black") {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "black";
        e.target.innerText = "Day Mode";
        e.target.style.color = "black";
        e.target.style.backgroundColor = "white";
    } else {
        body.style.backgroundColor = "bisque";
        e.target.innerText = "Night Mode";
        e.target.style.color = "white";
        e.target.style.backgroundColor = "black";
    }
}