//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var userProfile = sequelize.define('userProfile', {
			firstName:    DataTypes.STRING,
			lastName:     DataTypes.STRING,
			address1:     DataTypes.STRING,
			address2:     DataTypes.STRING,
			city:         DataTypes.STRING,
			postalCode:   DataTypes.STRING
		},
		{
			associate: function(models){
				userProfile.belongsTo(models.User); //hierarchy of connections
        		userProfile.belongsTo(models.state); //state belongs to userProfile
        		userProfile.hasMany(models.item);
			}
		}
	);

	return userProfile;
};
