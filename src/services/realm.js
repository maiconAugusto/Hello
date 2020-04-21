const Realm = require('realm');

class User {}
User.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', indexed: true },
        name: 'string',
        email: 'string',
        password: 'string'
    },
};
class Activities {}
Activities.schema = {
    name: 'Activities',
    primaryKey: 'id',
    properties: {
        id_user: 'string',
        id: { type: 'int', indexed: true },
        title: 'string',
        hour: 'string',
        description: 'string',
        date: 'string',
        done: 'bool'
    },
};


const realm = new Realm({schema: [User,Activities]});
export default realm