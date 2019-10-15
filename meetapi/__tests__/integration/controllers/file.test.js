import request from 'supertest';
import { fs } from 'mz';
// const fs = require('mz/fs');
import app from '../../../src/app';
//import fs from 'fs';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('File', () => {
  beforeEach(async () => {
    // clear database
    await truncate();
  });

  it('it should be possible upload a image file by a logged user', async () => {
    // log in app
    const user = await factory.attrs('User');

    // save email and password
    const { email, password } = user;

    // create user
    await request(app)
      .post('/users')
      .send(user);

    // acess the app
    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    const token = response.body;
    // post file
    const filePath = `${__dirname}/files/filetest.pdf`;

    // Upload first test file to CDN
    //fs.exists(filePath, exists => {
    //console.log(filePath);
    //if (!exists) throw new Error('file does not exist');
    //});

    const result = await request(app)
      .post('/files') // Attach the file with key 'file' which is corresponding to your endpoint setting.
      .set('Authorization', `Bearer ${token}`)
      .attach('file', filePath);
    //.then(res => {
    // const { success, message, filePath } = res.body;
    // expect(success).toBeTruthy();
    //expect(message).toBe('Uploaded successfully');
    expect(result.status).toBe(200); // store file data for following tests
    //    testFilePath = filePath;
    //    })
    //.catch(err => console.log(err));

    //.then(exists => {});
    /*
    const result = await request(app)
      .post('/files')
      .attach('')
      .set('Authorization', `Bearer ${token}`)
      .send({ msg: 'seu arquivo' });

    // expect(result.text).toContain('token');
    expect(result.status).toBe(200);
   */
  });
});
