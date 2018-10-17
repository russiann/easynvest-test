import contacts from '../models/contacts.model';
import { render } from '../helpers/utils';
import bindClickEvents from '../helpers/bindClickEvents';

contacts.initialize()
  .then(() => {
    const items = contacts.find();

    const events = {
      editContact: (ev, el) => {
        const id = el.attributes.getNamedItem('id').value;
        document.location.href = `/contact.html?id=${id}`;
      }
    };

    const list = render('.list', `
      <ul class="list">
        ${items.map(item => `
          <li id="${item.id}" bindclick="editContact" class="list-item">
            <div class="list-item__cpf">CPF: ${item.cpf}</div>
            <div class="list-item__name">${item.name}</div>
            <div class="list-item__email">${item.email}</div>
            <div class="list-item__phone">${item.phone}</div>
          </li>
        `).join('')}
      </ul>
    `);

    bindClickEvents('.list', events);
  });
