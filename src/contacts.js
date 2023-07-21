const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');
const read = fs.readFile(contactsPath).then(data => JSON.parse(data));

console.log(contactsPath);

// TODO: document each function
async function listContacts() {
    const data = await read;
    console.table(data);
};

function getContactById() {
  console.log("getContacts");
};

function removeContact() {
  console.log("removeContacts");
};

function addContact() {
  console.log("addContacts");
};

module.exports = { listContacts, getContactById, removeContact, addContact };