const UserController = require('./controllers/usercontroller');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers
  },
];
