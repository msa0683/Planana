module.exports = function(sequelize, DataTypes) {
  var Itinerary = sequelize.define("itineraries", {
    itinerary_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        len: [1]
      }
    }
  });

  Itinerary.associate = function(models) {
    Itinerary.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });

    Itinerary.hasMany(models.activities, {
      onDelete: 'CASCADE'
    });
  };
  return Itinerary;
};
