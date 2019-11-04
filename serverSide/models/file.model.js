module.exports = (sequelize, Sequelize) => {
	const File = sequelize.define('sampleproject', {
	  name: {
		type: Sequelize.STRING
	  },
	  link: {
		type: Sequelize.STRING
	  }
	});
	
	return File;
}