import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Auth', () => {
  // clear database
  beforeEach(async () => {
    await truncate();
  });

  it('it should not be possible acess resticted routes without a token', async () => {
    let checkResponse = 401;
    let response = {};

    // put users
    response = await request(app).put('/users');
    checkResponse = response.status !== 401 ? response.status : checkResponse;

    // post meet
    response = await request(app).post('/meet');
    checkResponse = response.status !== 401 ? response.status : checkResponse;

    // put meet
    response = await request(app).put('/meet');
    checkResponse = response.status !== 401 ? response.status : checkResponse;

    // get meet
    response = await request(app).get('/meet');
    checkResponse = response.status !== 401 ? response.status : checkResponse;

    // delete meet
    response = await request(app).delete('/meet');
    checkResponse = response.status !== 401 ? response.status : checkResponse;

    expect(checkResponse).toBe(401);
  });

  it('it should not be possible acess whith a wrong token', async () => {
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
      .set('Authorization', `Bearer ${token}34`)
      .send({
        name: 'Fulano',
        email: 'fulano@fulano.com',
        oldPassword: '123445',
        password: '654321',
        confirmPassword: '654321',
      });

    expect(response.status).toBe(401);
    expect(response.text).toContain('Token invalid!');
  });
});
