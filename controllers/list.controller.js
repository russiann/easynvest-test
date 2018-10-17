import contacts from '../models/contacts.model';
import { render } from '../helpers/utils';
import bindClickEvents from '../helpers/bindClickEvents';

contacts.initialize()
  .then(() => {
    const items = contacts.list();

    const events = {
      editContact: () => console.log('redirect to edit page ✈')
    };

    const list = render('.list', `
      <ul class="list">
        ${items.map(item => `
          <li bindclick="editContact" class="list-item">
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
