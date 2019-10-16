import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Meet from '../src/app/models/Meet';
import Subscription from '../src/app/models/Subscription';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
  is_organizer: true,
});

factory.define('Meet', Meet, {
  title: faker.lorem.words(4),
  local: faker.address.streetAddress(),
  description: faker.lorem.words(100),
  date: faker.date.future(),
});

factory.define('Subscription', Subscription, {
  date: faker.date.future(),
});

export default factory;
