import contacts from '../models/contacts.model';
import { render, getParameterByName } from '../helpers/utils';
import bindClickEvents from '../helpers/bindClickEvents';

const renderContact = ({id, cpf, email, phone}) => `
  <h1>ID: ${id}</h1>
  <div>${name}</div>
  <div>${cpf}</div>
  <div>${email}</div>
  <div>${phone}</div>
`;

const renderEmpty = () => `
  <div>
    Contato não existe
  </div>
`

contacts.initialize()
  .then(() => {
    const id = getParameterByName('id');
    const contact = contacts.get(id);

    const events = {
      editContact: () => console.log('redirect to edit page ✈')
    };

    const list = render('.contact-page', `
      <div>
        ${contact
          ? renderContact(contact)
          : renderEmpty()
        }
      </div>
    `);

    bindClickEvents('.contact-page', events);
  });
