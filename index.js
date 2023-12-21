import * as contactService from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();

export const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.log(allContacts);

    case "get":
      const oneContact = await contactService.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact = await contactService.addContact(data);
      return console.log(newContact);

    case "remove":
      const removeContact = await contactService.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);
