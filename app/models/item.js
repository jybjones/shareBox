//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var item = sequelize.define('item', {
			name:            DataTypes.STRING,
			description:     DataTypes.TEXT
		},
		{
			associate: function(models){
				item.belongsTo(models.userProfile);
				item.belongsTo(models.category);
                item.belongsTo(models.condition);
                item.belongsTo(models.pod);
                item.hasMany(models.image);
                item.hasMany(models.request);
			}
		}
	);

	return item;
};
