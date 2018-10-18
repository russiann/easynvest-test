import storage from '../../helpers/storage';
import contacts from '../../models/contacts.model';

const fakeItems = [
  { "text": "Lorem ipsum" },
  { "text": "Dolor sit" },
  { "text": "Amet consectetur" }
];

describe('Contacts Model', () => {

  beforeEach(() => {
    storage.set('contacts', fakeItems);
  });

  it('should create contacts', () => {
    const item = contacts.create({ text: "sample text" });
    const storedItem = storage.get('contacts').find(({id}) => id === item.id);
    expect(storedItem).to.be.deep.equal(item);
  });

  it('should find contacts', () => {
    const items = contacts.find();
    console.log(storage.get('contacts'), items)
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
