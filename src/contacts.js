const nanoidId = require('nanoid');

const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');
const read = fs.readFile(contactsPath).then(data => JSON.parse(data));

//print a table of contacts excluding the id number
async function listContacts() {
    const data = await read;
    const filteredContact = data.map(item => {
        const { id, ...newData } = item;
        return newData;
    })
    console.table(filteredContact);
};

// print a table of a single contact based on id number
async function getContactById(contactId) {
    const data = await read;
    const singleContact = data.find(item => item.id === contactId);
    if (singleContact) {
        console.table(singleContact);
    } else {
        console.log('sorry, there is no user with that id \n');
    };
};

async function removeContact(contactId) {
    const data = await read;
    const newData = data.filter(item => item.id !== contactId);
    console.table(newData);
    
    fs.writeFile('./db/contacts.json', JSON.stringify(newData));
    console.log('Contact successfully deleted \n');
};

async function addContact(name, email, phone) {
    const data = await read;
    data.push({
        name: name,
        email: email,
        phone: phone,
        id: nanoidId.nanoid(21).toString()
    })
    console.table(data);
    fs.writeFile('./db/contacts.json', JSON.stringify(data))
    console.log('Woot! Your contact has been added.');
        
};

module.exports = { listContacts, getContactById, removeContact, addContact };