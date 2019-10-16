import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Meet extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        local: Sequelize.STRING,
        description: Sequelize.STRING,
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 6));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'organizer_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
  }
}

export default Meet;
