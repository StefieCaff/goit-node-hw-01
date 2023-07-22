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
    const newContacts = data.filter(item => item.id !== contactId);
    fs.writeFile('contacts.json', JSON.stringify(newContacts));
    console.log('Contact successfully deleted');
};

async function addContact(name, email, phone) {
  console.log("addContacts");
};

module.exports = { listContacts, getContactById, removeContact, addContact };