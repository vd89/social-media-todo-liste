export default {
  testUser: {
    userName: 'jamesBond',
    email: 'JamesBond@gmail.com',
    password: 'Test_1234',
  },
  todoUser: {
    userName: 'willSmith',
    email: 'willSmith@gmail.com',
    password: 'Test_1234',
  },
  errorResp: [
    {
      body: 'email',
      msg: 'Valid email is required',
    },
    {
      body: 'email',
      msg: 'Valid email is required',
    },
    {
      body: 'password',
      msg: 'Please enter a password with 6 or more characters',
    },
    {
      body: 'password',
      msg: 'Please enter a password with 6 or more characters',
    },
  ],
  emailCheck: {
    userName: 'jamesBond',
    email: 'JamesBond@gmai',
    password: 'Test_1234',
  },
  emailCheckResponse: [
    {
      body: 'email',
      msg: 'Valid email is required',
    },
  ],
  passCheck: {
    userName: 'jamesBond',
    email: 'JamesBond@gmail.com',
    password: 'Te',
  },
  passCheckResponse: [
    {
      body: 'password',
      msg: 'Please enter a password with 6 or more characters',
    },
  ],
  loginError: [
    {
      body: 'userName',
      msg: 'userName  is required',
    },
    {
      body: 'password',
      msg: 'Please enter a password with 6 or more characters',
    },
    {
      body: 'password',
      msg: 'Please enter a password with 6 or more characters',
    },
  ],
  wrongUser: {
    userName: 'jamesB',
    password: 'Test_1234',
  },
  wrongPass: {
    userName: 'jamesBond',
    password: 'Test_12',
  },
  correctUser: {
    userName: 'jamesBond',
    password: 'Test_1234',
  },
};
