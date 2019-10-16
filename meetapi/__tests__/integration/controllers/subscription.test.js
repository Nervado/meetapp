/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Subscription', () => {
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
    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    token = response.body.token;
  });

  it('it should be possible create a new subscription', async () => {
    const subscription = await factory.attrs('Subscription');
    // create user
    const response = await request(app)
      .post('/subscriptions')
      .set('Authorization', `Bearer ${token}`)
      .send(subscription);

    // console.log(subscription);

    expect(response.status).toBe(200);
  });
});
