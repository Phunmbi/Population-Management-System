export default (sequelize, DataTypes) => {
  const SubLocation = sequelize.define(
    'SubLocation',
    {
      sub_location_name: {
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
  SubLocation.associate = (models) => {
    SubLocation.belongsTo(models.Location, {
      as: 'location_reference',
      foreignKey: 'location',
      onDelete: 'CASCADE'
    });
  };
  return SubLocation;
};
