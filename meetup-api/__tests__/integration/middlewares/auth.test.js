import request from 'supertest';

import app from '../../../src/app';
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
});
