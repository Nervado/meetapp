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

  it('it should be possible login the app', async () => {
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

  it('a unknow user should no be able to login', async () => {
    const { email, password } = await factory.attrs('User');
    const response = await request(app)
      .post('/sessions')
      .send({ email, password });
    expect(response.status).toBe(401);
    expect(response.text).toContain('not found');
  });
});