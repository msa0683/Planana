module.exports = function(sequelize, DataTypes) {
  var activities = sequelize.define("activities", {
    activity_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        len: [1]
      }
    },
    activity_address: {
      type: DataTypes.STRING
    },
    activity_rating: {
      type: DataTypes.STRING
    },
    activity_photo: {
      type: DataTypes.STRING
    },
    activity_time: {
      type: DataTypes.TIME,
    }
  });

  activities.associate = function(models) {
    activities.belongsTo(models.itineraries, {
      foreignKey: {
        // Set to true when itineraries is populated
        allowNull: true
      }
    });
  };
  return activities;
};
