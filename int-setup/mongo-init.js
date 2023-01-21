/* eslint-disable */
db.auth('admin-user', 'admin-password');

test = db.getSiblingDB('tests_data_viz');
dev = db.getSiblingDB('dev_data_viz');

test.createUser({
  user: 'mongouser',
  pwd: 'mongopass',
  roles: [
    {
      role: 'readWrite',
      db: 'tests_data_viz'
    },
    {
      role: 'readWrite',
      db: 'dev_data_viz'
    }
  ]
});

dev.createUser({
  user: 'mongouser',
  pwd: 'mongopass',
  roles: [
    {
      role: 'readWrite',
      db: 'dev_data_viz'
    }
  ]
});
