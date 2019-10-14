import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';

// import User from '../../src/app/models/User';
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
  });

  it('should be able to change password', async () => {
    // set know password
    let user = await factory.attrs('User', { password: '123456' });
    const { name, email, password } = user;

    await request(app)
      .post('/users')
      .send(user);

    let response = await request(app)
      .post('/sessions')
      .send({ email, password });

    // save user_id
    const { token } = response.body;
    console.log(response.body);
    // update password
    user = {
      name,
      email,
      oldPassword: '123456',
      password: '654321',
      confirmPassword: '645321',
      is_organizer: false,
    };

    console.log(user);

    // put the data
    const result = await request(app)
      .put('/users')
      .set({ authorization: `Bearer ${token}` })
      .send(user);

    // expect(response.data).toHaveProperty('id');
    // expect(response.data.id).toBe(toString(id));
    expect(result.status).toBe(200);
  });
});
