import contacts from '../models/contacts.model';
import { render, getParameterByName, getFormValues, addClass, removeClass } from '../helpers/utils';
import createComponent from '../helpers/createComponent';

const renderSpinner = () => `
  <svg class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  </svg>
`;

const renderInput = ({label, name, value, pattern, error, required}) => `
  <div class="form__input-container">
    <div class="form__label">${label}</div>
    <input name="${name}" type="text" value="${value}" class="form__input"  ${pattern ? `pattern="${pattern}"`: ''} ${required ? 'required': ''} />
    <div class="form__error">${error}</div>
  </div>
`;

const renderContactForm = ({id, name, cpf, email, phone}, submiting) => `
  <form id="contact-form" class="form" bindchange="onFormChange" bindinput="onFormChange">
    ${renderInput({
      name: 'name',
      label: 'Nome completo (sem abreviações)',
      value: name,
      pattern: '.{3,}',
      error: 'Campo deve conter 3 caracteres ou mais',
      required: true
    })}
    ${renderInput({ name: 'email', label: 'E-mail', value: email, required: true, error: 'Campo requirido' })}
    ${renderInput({ name: 'cpf', label: 'CPF', value: cpf, required: true, error: 'Campo requirido' })}
    ${renderInput({ name: 'phone', label: 'Phone', value: phone, required: true, error: 'Campo requirido' })}

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
          const { values, valid } = getFormValues('#contact-form');
          if (!valid) return;
        
          setState(actions.updateForm(values));
          setState(actions.toggleSubmiting);

          (contact)
            ? contacts.patch(contact.id, values)
            : contacts.create(values);

          setTimeout(() => {
            setState(actions.toggleSubmiting);
            document.location.href = '/index.html';
          }, 2000);
        },
        onFormChange: () => {
          const { valid } = getFormValues('#contact-form');
          (valid)
            ? removeClass('.button', 'button--disabled')
            : addClass('.button', 'button--disabled');
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
