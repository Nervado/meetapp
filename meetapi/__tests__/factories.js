import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Meet from '../src/app/models/Meet';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
  is_organizer: true,
});

factory.define('Meet', Meet, {
  title: faker.lorem.words(4),
  local: faker.address.city('Rio de Janeiro'),
  date: faker.date.future(0.5),
  organizer_id: 1,
  banner_id: 1,
  // banner: faker.image.business(200, 200),
});

export default factory;
