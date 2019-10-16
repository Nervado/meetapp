import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Subscriber', () => {
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

  it('it should be possible create a new subscription', async () => {
    // create user
    const response = await request(app)
      .post('/subscriptions')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: 1, meet_id: 1 });

    expect(response.status).toBe(200);
  });
});
