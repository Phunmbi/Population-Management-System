'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sub_location_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      male_population: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      female_population: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_population: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubLocations');
  }
};
