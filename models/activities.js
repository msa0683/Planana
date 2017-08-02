module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("activities", {
    activity_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        len: [1]
      }
    },
    activity_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });

  Activity.associate = function(models) {
    Activity.belongsTo(models.Itineraries, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Activity;
};
