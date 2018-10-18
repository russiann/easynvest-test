import storage from '../helpers/storage';
import { generateHash } from '../helpers/utils';

const API_ENDPOINT = 'https://private-21e8de-rafaellucio.apiary-mock.com/users';

const contacts = {

  initialize() {
    const isAlreadyFetched = storage.get('isAlreadyFetched');
    return isAlreadyFetched
      ? Promise.resolve()
      : fetch(API_ENDPOINT)
          .then(res => res.json())
          .then(res => {

            const contacts = res.map(contact =>
              ({ id: generateHash(), ...contact }));

            storage.set('contacts', contacts);
            storage.set('isAlreadyFetched', true)
          });
  },

  find() {
    return storage.get('contacts') || [];
  },

  get(id) {
    const collection = this.find();
    return collection.find(item => item.id === id);
  },

  create(data) {
    const collection = this.find();
    const item = {
      id: generateHash(),
      ...data
    };
    storage.set('contacts', collection.concat([item]));
    return item;
  },

  patch(id, data) {
    const collection = this.find();
    let result;

    storage.set('contacts',
      collection.map(item => {
        if (item.id !== id) return item;
        result = { ...item, ...data };
        return result;
      })
    );

    return result;
  },

  remove(id) {
    const collection = this.find();
    storage.set('contacts',
      collection.filter(item => item.id !== id)
    );
  }

}

export default contacts;
