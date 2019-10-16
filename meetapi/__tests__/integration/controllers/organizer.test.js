import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Meet', () => {
  // clear database

  // token
  let token = '';

  beforeEach(async () => {
    // clear database
    await truncate();
    // login
    const user = await factory.attrs('User');

    // save email and password
    const { email, password } = user;

    // create user
    await request(app)
      .post('/users')
      .send(user);

    // try acess the app
    let response = await request(app)
      .post('/sessions')
      .send({ email, password });

    token = response.body.token;
  });

  it('it should be possible create a new meet', async () => {
    const meet = await factory.attrs('Meet');

    // create user
    const response = await request(app)
      .post('/meets')
      .set('Authorization', `Bearer ${token}`)
      .send(meet);

    // expect(response.text).toContain('token');
    expect(response.status).toBe(200);
  });
});
