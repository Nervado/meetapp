/* eslint-disable no-undef */
import request from 'supertest';
// import bcrypt from 'bcryptjs';
import app from '../../../src/app';

// import User from '../../src/app/models/User';
import factory from '../../factories';

import truncate from '../../util/truncate';

describe('Auth', () => {
  // clear database
  beforeEach(async () => {
    await truncate();
  });

  it('it should be possible creat a meetup', async () => {
    const user = await factory.attrs('User');

    // save email and password
    const { email, password } = user;

    // create user
    await request(app)
      .post('/users')
      .send(user);

    // try acess the app
    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.text).toContain('token');
    expect(response.status).toBe(200);
  });
});
