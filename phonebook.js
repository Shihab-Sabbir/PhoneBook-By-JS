window.localStorage.setItem('id', 0);

function getInnerText(id) {
    let value = document.getElementById(id).innerText;
    return value;
}

function getInput(id) {
    let value = document.getElementById(id);
    return value;
}

document.getElementById('addNew').addEventListener('click', function () {
    document.getElementById('input').classList.remove('hidden');
    document.getElementById('addLocation').classList.add('hidden');
    document.getElementById('addNew').classList.add('hidden');
})

function save() {

    let name = getInput('nameInput');
    let email = getInput('emailInput');
    let number = getInput('numberInput');

    const parentLocation = document.getElementById('addLocation');
    const div = document.createElement('div');
    div.innerHTML = `
<div class="flex items-center justify-center p-5 border-2 m-5 rounded-xl shadow-md contacts">
                <div class="flex flex-col items-start w-3/4">
                    <div>
                            <p class='parentContactName'>Name : <span class='contactName'>${name.value}</span> </p>
                        </div>
                        <div>
                            <p>Number : <span class='contactNubmer'>${number.value}</span></p>
                        </div>
                        <div>
                            <p>Email : <span>${email.value}</span></p>
                        </div>
                </div>
                <div class="flex flex-col items-start w-1/4">
                    <button class="w-20 sm:w-28 bg-red-300 p-1 my-1 rounded-lg" id="delete">Delete</button>
                    <button class="w-20 sm:w-28 bg-blue-300 p-1 my-1 rounded-lg" id="edit">Edit</button>
                </div>
            </div>

`
    const spnaCollection = div.getElementsByTagName('span');
    for (const span of spnaCollection) {
        let id = parseInt(window.localStorage.getItem('id'));
        span.setAttribute('id', id + 1);
        window.localStorage.setItem('id', id + 1);
    }
    parentLocation.appendChild(div);
    name.value = '';
    email.value = '';
    number.value = '';
    name.setAttribute('placeholder', 'Name');
    email.setAttribute('placeholder', 'Email');
    number.setAttribute('placeholder', 'Number');
    document.getElementById('input').classList.add('hidden');
    document.getElementById('addLocation').classList.remove('hidden');
    document.getElementById('addNew').classList.remove('hidden');



}

//seacring

function searchByIdType(a, b) {
    let search = document.getElementById('search-navbar');
    let contacts = document.getElementsByClassName(a);
    for (let contact of contacts) {
        console.log(search.value)
        console.log(contact.innerText)
        if (search.value == contact.innerText) {
            console.log(contact.innerText)
            const div = document.createElement('div');
            div.innerHTML = `<div class=" p-5 border-2 m-5 rounded-xl shadow-md">
                <div class="flex flex-col items-start w-3/4">
                    <div>
                            <p>${b} : <span>${contact.innerText}</span> </p>
                    </div>
                </div>
            </div>`;
            document.getElementById('search-result').appendChild(div);
        }
    }
}

function search() {
    searchByIdType('contactName', 'Name');
    searchByIdType('contactNubmer', 'Number');
};



// delete items

const phoneBookItems = document.getElementsByClassName('parentClass');

for (const item of phoneBookItems) {
    item.addEventListener('click', function (event) {
        if (event.target.id === 'delete') { event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode) }
    })
}


// edit items

for (const item of phoneBookItems) {

    item.addEventListener('click', function (event) {
        if (event.target.id === 'edit') {
            let saving = false;
            document.getElementById('addLocation').classList.add('hidden');
            document.getElementById('addNew').classList.add('hidden');
            document.getElementById('input').classList.remove('hidden');
            let name1 = getInput("nameInput");
            let email = getInput('emailInput');
            let number = getInput('numberInput');
            let common = event.target.parentNode.previousElementSibling;
            let oldName = getInnerText(common.firstChild.nextSibling.firstChild.nextSibling.lastChild.previousElementSibling.id);
            let oldEmail = getInnerText(common.children[1].firstChild.nextElementSibling.lastChild.id);
            let oldNumber = getInnerText(common.children[2].firstChild.nextElementSibling.lastChild.id);
            name1.value = oldName;
            email.value = oldEmail;
            number.value = oldNumber;
            console.log(name1.value);
            event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode)
            saving = true;
        }
        if (event.target.id === 'edit' && saving == true) {
            save();
        }
    })
}
//  sort by name

