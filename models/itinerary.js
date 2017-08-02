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

<<<<<<< HEAD
    User.hasMany(models.activities, {
=======
    Itinerary.hasMany(models.activities, {
>>>>>>> 4fd6529647043574a04cfa821842f8725495defe
      onDelete: 'CASCADE'
    });
  };
  return Itinerary;
};
