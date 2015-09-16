//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var item = sequelize.define('item', {
			name:            DataTypes.STRING,
			description:     DataTypes.TEXT
		},
		{
			associate: function(models){
				item.belongsTo(models.userProfile);
			}
		}
	);

	return item;
};
