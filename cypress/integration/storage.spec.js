import storage from '../../helpers/storage';

describe('Storage Helper', () => {

  it('should store numbers', () => {
    const number = 1994;
    storage.set('number', number);
    const storedNumber = storage.get('number');

    expect(storedNumber).to.equal(number);
  });

  it('should store strings', () => {
    const string = 'foo bar buzz';
    storage.set('string', string);
    const storedString = storage.get('string');

    expect(storedString).to.equal(string);
  });

  it('should store objects', () => {
    const obj = { foo: 'bar' };
    storage.set('obj', { foo: 'bar' });
    const storedObj = storage.get('obj');

    expect(storedObj).to.deep.equal(obj);
  });

});
