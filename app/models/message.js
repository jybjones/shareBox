//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var message = sequelize.define('message', {
            message:      DataTypes.TEXT
        },
		{
			associate: function(models){
                message.belongsTo(models.userProfile, {as: "From"});
                message.belongsTo(models.userProfile, {as: "To"});
                message.belongsTo(models.request);
			}
		}
	);

	return message;
};
