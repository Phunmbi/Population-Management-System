export default (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      location_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      male_population: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      female_population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_population:{
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { paranoid: true }
  );
  Location.associate = (models) => {
    Location.hasMany(models.SubLocation, {
      foreignKey: 'location',
      as: 'location'
    });
  };
  return Location;
};
