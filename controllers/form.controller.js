import contacts from '../models/contacts.model';
import { render, getParameterByName, getFormValues, iff } from '../helpers/utils';
import bindClickEvents from '../helpers/bindClickEvents';
import createComponent from '../helpers/createComponent';

const renderSpinner = () => `
  <svg class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  </svg>
`;

const renderInput = ({label, name, value}) => `
  <div class="form__input-container">
    <div class="form__label">${label}</div>
    <input name="${name}" type="text" value="${value}" class="form__input" />
  </div>
`;

const renderContactForm = ({id, name, cpf, email, phone}, submiting) => `
  <form id="contact-form" class="form">
    ${renderInput({ name: 'name', label: 'Nome completo (sem abreviações)', value: name })}
    ${renderInput({ name: 'email', label: 'E-mail', value: email })}
    ${renderInput({ name: 'cpf', label: 'CPF', value: cpf })}
    ${renderInput({ name: 'phone', label: 'Phone', value: phone })}

    <div class="button" bindclick="submitForm">
      ${submiting
        ? renderSpinner()
        : id ? 'Salvar' : 'Cadastrar'
      }
    </div>
  </form>
`;

const renderEmpty = () => `
  <div>
    Contato não existe
  </div>
`;

contacts.initialize()
  .then(() => {
    const id = getParameterByName('id');
    const contact = contacts.get(id);

    const initialFormValues = {
      name: '',
      email: '',
      cpf: '',
      phone: ''
    };

    const actions = {
      toggleSubmiting: (state) => ({ ...state, submiting: !state.submiting }),
      updateForm: (values) => (state) => ({...state, form: { ...state.form, ...values}})
    };

    createComponent((setState) => ({
      el: '.contact-page',
      state: {
        form: contact || initialFormValues,
        submiting: false
      },
      events: {
        submitForm: () => {
          const values = getFormValues('#contact-form');
        
          setState(actions.updateForm(values));
          setState(actions.toggleSubmiting);

          (contact)
            ? contacts.patch(contact.id, values)
            : contacts.create(values);

          setTimeout(() => {
            setState(actions.toggleSubmiting);
            document.location.href = '/index.html';
          }, 2000);
        }
      },
      render: ({ submiting, form }) => `
        <div>
          ${(id && !contact)
            ? renderEmpty()
            : renderContactForm(form, submiting)
          }
        </div>
      `
    }))
  });
