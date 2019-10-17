/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Meet', () => {
  // clear database

  // token
  let token = '';
  let id_user = '';

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
    id_user = response.body.id;
  });

  it('it should be possible create a new meet', async () => {
    const meet = await factory.attrs('Meet');

    // create user
    const response = await request(app)
      .post('/meets')
      .set('Authorization', `Bearer ${token}`)
      .send(meet);

    expect(response.status).toBe(200);
  });

  it('it should be possible update a meet', async () => {
    let meet = await factory.attrs('Meet');

    // create user
    let response = await request(app)
      .post('/meets')
      .set('Authorization', `Bearer ${token}`)
      .send(meet);

    const { id } = response.body;

    meet = await factory.attrs('Meet');

    response = await request(app)
      .put(`/meets/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(meet);

    expect(response.status).toBe(200);
  });

  it('it should be possible list all created meetups', async () => {
    // let meet = await factory.attrs('Meet');

    let response = await request(app)
      .post('/meets')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...(await factory.attrs('Meet')), organizer_id: id_user });

    response = await request(app)
      .post('/meets')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...(await factory.attrs('Meet')), organizer_id: id_user });

    response = await request(app)
      .post('/meets')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...(await factory.attrs('Meet')), organizer_id: id_user });

    response = await request(app)
      .post('/meets')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...(await factory.attrs('Meet')), organizer_id: id_user });

    response = await request(app)
      .get(`/meets`)
      .set('Authorization', `Bearer ${token}`);

    response = await request(app)
      .get(`/meets?date=${(await factory.attrs('Meet')).date}&page=1`)
      .set('Authorization', `Bearer ${token}`);
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
