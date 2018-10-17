/* global describe, it, before */
import chai from 'chai';

import storage from '../helpers/storage';
import contacts from '../models/contacts.model';

chai.expect();
const expect = chai.expect;

const fakeItems = [
  {
    "name": "My name 1",
    "cpf": "04080757247",
    "phone": "11987654321",
    "email": "myemail1@test.com.br"
  },
  {
    "name": "My name 2",
    "cpf": "77797584192",
    "phone": "11987654321",
    "email": "myemail2@test.com.br"
  },
  {
    "name": "My name 3",
    "cpf": "45486737688",
    "phone": "11987654321",
    "email": "myemail3@test.com.br"
  }
];

describe('Contacts Model', () => {

  before(() => {
    storage.set('contacts', []);
  });

  it('should create contacts', () => {
    fakeItems.forEach(item => contacts.create(item));
    expect(storage.get('contacts')).to.be.deep.equal(fakeItems);
  });

  it('should find contacts', () => {
    const items = contacts.find();
    expect(storage.get('contacts')).to.be.deep.equal(items);
  });

  it('should get a contact record', () => {
    const [firstItem] = contacts.find();
    const item = contacts.get(firstItem.id);
    expect(firstItem).to.be.deep.equal(item);
  });

  it('should patch a contact record', () => {
    const [firstItem] = contacts.find();
    const item = contacts.patch(firstItem.id, { foo: 'bar' });
    expect(item).to.have.property('foo', 'bar');
  });

  it('should remove a contact record', () => {
    const [firstItem] = contacts.find();
    contacts.remove(firstItem.id);
    const item = contacts.get(firstItem.id);
    expect(item).to.equal(undefined);
  });

});
