//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var request = sequelize.define('request', {
            startDate:      DataTypes.DATEONLY,
            endDate:        DataTypes.DATEONLY,
            approved:       DataTypes.BOOLEAN
		},
		{
			associate: function(models){
                request.belongsTo(models.userProfile, {as: "RequesterProfile"});
                request.belongsTo(models.userProfile, {as: "LenderProfile"});
                request.belongsTo(models.item);
                request.hasMany(models.message);
			}
		}
	);

	return request;
};
