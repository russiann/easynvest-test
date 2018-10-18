/// <reference types="Cypress" />
import storage from '../../helpers/storage';

const wait = (time) => {
  return new Cypress.Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

context('List Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/index.html');
  })

  it('should have a list with stored contacts', () => {

    wait(1000)
      .then(() => {
        const items = storage.get('contacts');
        cy.get('.list li')
          .each((element) => {
            const id = element.attr('id');
            const listItemData = {
              cpf: element.find('.list-item__cpf').text().replace('CPF: ', ''),
              name: element.find('.list-item__name').text(),
              email: element.find('.list-item__email').text(),
              phone: element.find('.list-item__phone').text(),
              id
            };
            expect(items).to.deep.include(listItemData);
          });
      });
  });

})
