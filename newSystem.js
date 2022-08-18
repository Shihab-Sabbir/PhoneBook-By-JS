function getInnerText(id) {
    let value = document.getElementById(id).innerText;
    return value;
}

function getInput(id) {
    let value = document.querySelector(id);
    return value;
}

let nameIp = getInput('#nameInput');
let emailIp = getInput('#emailInput');
let numberIp = getInput('#numberInput');

//add new contact
document.getElementById('addNew').addEventListener('click', function () {
    document.getElementById('input').classList.remove('hidden');
    document.getElementById('addLocation').classList.add('hidden');
    document.getElementById('search-navbar').setAttribute("disabled", "");
    document.getElementById('addNew').setAttribute("disabled", true);
    nameIp.value = '';
    emailIp.value = '';
    numberIp.value = '';
    nameIp.setAttribute('placeholder', 'Name');
    emailIp.setAttribute('placeholder', 'Email');
    numberIp.setAttribute('placeholder', 'Number');
    document.getElementById('save').classList.add('hidden');
})


//common variable
let contacts = [];
const str = localStorage.getItem("contacts");


// vaidation
document.getElementById('numberInput').addEventListener('keyup', validate);
function validate() {
    if ((nameIp.value.length == 0 || numberIp.value.length == 0) || isNaN(numberIp.value)) {
        document.getElementById('save').classList.add('hidden');
    }
    else if (isNaN(numberIp.value) === false) {
        document.getElementById('save').classList.remove('hidden');
        contacts.forEach(element => {
            if (element.number === numberIp.value) {
                document.getElementById('save').classList.add('hidden');
                window.alert('Number already exixts');
            }
        });
    }
};

// delete

function deleted(event) {
    const idx = Array.from(event.target.parentNode.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode.parentNode); // finding the delete node number of child to remove that value from contacts array
    event.target.parentNode.parentNode.remove();
    contacts.splice(idx, 1);
}

const phoneBookItems = document.getElementsByClassName('phonebook-container');

for (const item of phoneBookItems) {

    item.addEventListener('click', function (event) {
        if (event.target.id === 'delete') {
            deleted(event);
        }
    })

}

//edit
for (const item of phoneBookItems) {

    item.addEventListener('click', function (event) {
        if (event.target.id === 'edit') {
            deleted(event); // delete the old contact , which will be edited
            nameIp.value = '';
            emailIp.value = '';
            numberIp.value = '';
            let saving = false;
            document.getElementById('addLocation').classList.add('hidden');
            document.getElementById('addNew').classList.add('hidden');
            document.getElementById('input').classList.remove('hidden');
            let common = event.target.parentNode.previousElementSibling;
            nameIp.placeholder = common.firstChild.nextSibling.firstChild.nextSibling.lastChild.previousElementSibling.innerText;
            numberIp.setAttribute('placeholder', common.children[1].firstChild.nextElementSibling.lastChild.innerText);
            emailIp.setAttribute('placeholder', common.children[2].firstChild.nextElementSibling.lastChild.innerText);
            saving = true;
        }
        if (event.target.id === 'edit' && saving == true) {
            save();
        }
    })
}

// function removeDuplicate() {
//     const uniqueIds = [];

//     const contact = contacts.filter(element => {
//         const isDuplicate = uniqueIds.includes(element.number);

//         if (!isDuplicate) {
//             uniqueIds.push(element.number);

//             return true;
//         }

//         return false;
//     });
//     contacts.splice(0, contacts.length);
//     contacts = contact.splice(0, contact.length);
//     console.log(contacts);
// }

function displayData() {
    const parentLocation = document.getElementById('addLocation');
    parentLocation.innerHTML = ''; // for clearing previous data
    contacts.map(({ name, number, email }) => {
        const div = document.createElement('div');
        div.innerHTML = `
<div class="flex items-center justify-center p-5 border-2 m-5 rounded-xl shadow-md ">
                <div class="flex flex-col items-start w-3/4">
                    <div>
                            <p class='parentContactName'>Name : <span class='contactName'>${name}</span> </p>
                        </div>
                        <div>
                            <p>Number : <span class='contactNubmer'>${number}</span></p>
                        </div>
                        <div>
                            <p>Email : <span>${email}</span></p>
                        </div>
                </div>
                <div class="flex flex-col items-start w-1/4">
                    <button class="w-20 sm:w-28 bg-red-300 p-1 my-1 rounded-lg" id="delete">Delete</button>
                    <button class="w-20 sm:w-28 bg-blue-300 p-1 my-1 rounded-lg" id="edit">Edit</button>
                </div>
            </div>

`
        parentLocation.appendChild(div);
        document.getElementById('search-navbar').disabled = false;

    });
}

if (str) {
    contacts = JSON.parse(str);
    displayData();
}

//save
document.querySelector('#save').addEventListener('click', save)
function save() {
    const newContact = { name: nameIp.value, email: emailIp.value, number: numberIp.value }
    contacts.push(newContact);


    contacts.sort(function (x, y) {
        let a = x.name.toUpperCase(),
            b = y.name.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
    });


    displayData();

    document.getElementById('input').classList.add('hidden');
    document.getElementById('addLocation').classList.remove('hidden');
    document.getElementById('addNew').removeAttribute("disabled");
    // document.getElementById('contact-header').classList.remove('hidden');

    //data is storing in local storage
    let storageData = JSON.stringify(contacts);
    window.localStorage.setItem("contacts", storageData);
    return contacts;
}

//search done
document.getElementById('search-navbar').addEventListener('keyup', function () {
    let search = document.getElementById('search-navbar');
    let indexes = [];
    let searchData = [];
    let uniqueSearchItems = [];
    let unique = [];
    for (let index = 0; index < contacts.length; index++) {

        if (search.value === contacts[index].name) {
            indexes.push(index);
        }
        else {
            document.getElementById('search-result').innerHTML = '';
        }
    }
    for (const index of indexes) {
        searchData.push({
            searchName: contacts[index].name,
            searchNumber: contacts[index].number
        })
    }
    unique = searchData.filter(element => {
        const isDuplicate = uniqueSearchItems.includes(element.searchNumber);
        if (!isDuplicate) {
            uniqueSearchItems.push(element.searchNumber);
            return true;
        }
        return false;
    });
    if (search.value == '') {
        document.getElementById('addLocation').classList.remove('hidden');
        document.getElementById('addNew').classList.remove('hidden');
        document.getElementById('search-result').innerHTML = '';
    }
    else {
        document.getElementById('addLocation').classList.add('hidden');
        document.getElementById('addNew').classList.add('hidden');
        document.getElementById('search-result').classList.remove('hidden');
        unique.map(({ searchName, searchNumber }) => {
            const div = document.createElement('div');
            div.innerHTML = `
            
<div class="flex items-center justify-center p-5 border-2 m-5 rounded-xl shadow-md ">
                <div class="flex flex-col items-start w-3/4">
                    <div>
                            <p class='parentContactName'>Name : <span class='contactName'>${searchName}</span> </p>
                        </div>
                        <div>
                            <p>Number : <span class='contactNubmer'>${searchNumber}</span></p>
                        </div>
                </div>
                <div class="flex flex-col items-start w-1/4">
                    <button class="w-20 sm:w-28 bg-red-300 p-1 my-1 rounded-lg" id="delete">Delete</button>
                    <button class="w-20 sm:w-28 bg-blue-300 p-1 my-1 rounded-lg" id="edit">Edit</button>
                </div>
            </div>
`;
            document.getElementById('search-result').appendChild(div);
        })
    }
});



