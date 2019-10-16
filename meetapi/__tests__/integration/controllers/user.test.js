import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';

import factory from '../../factories';

import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('shold encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const comparehash = await bcrypt.compare('123456', user.password_hash);
    expect(comparehash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.text).toContain('error');
  });

  it('should be able to change password', async () => {
    // set know password
    const user = await factory.attrs('User', { password: '123456' });

    const { name, email, password } = user;

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    // save token
    const { token } = response.body;
    // put the data
    const result = await request(app)
      .put('/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        name,
        email,
        oldPassword: '123456',
        password: '654321',
        confirmPassword: '654321',
        is_organizer: true,
      });

    expect(result.status).toBe(200);
  });

  it('a unknow user should no be able to update a profile', async () => {
    let user = await factory.attrs('User', { password: '123456' });

    let { email, password } = user;

    await request(app)
      .post('/users')
      .send(user);

    let response = await request(app)
      .post('/sessions')
      .send({ email, password });

    const { token } = response.body;

    await truncate();

    response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fulano',
        email: 'fulano@fulano.com',
        oldPassword: '123456',
        password: '654321',
        confirmPassword: '654321',
      });

    expect(response.status).toBe(400);
    expect(response.text).toContain('not found');
  });

  it('a wrong user password sended should return an error', async () => {
    let user = await factory.attrs('User', { password: '123456' });

    let { email, password } = user;

    await request(app)
      .post('/users')
      .send(user);

    let response = await request(app)
      .post('/sessions')
      .send({ email, password });

    const { token } = response.body;

    response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fulano',
        email: 'fulano@fulano.com',
        oldPassword: '123445',
        password: '654321',
        confirmPassword: '654321',
      });

    expect(response.status).toBe(401);
    expect(response.text).toContain('Password does not match');
  });
});
