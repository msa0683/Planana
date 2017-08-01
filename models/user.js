module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("users", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        len: [1]
      }
    }
  });

  Itinerary.associate = function(models) {
    User.hasMany(models.itineraries, {
      onDelete: 'CASCADE'
    });
  };
  return User;
};
