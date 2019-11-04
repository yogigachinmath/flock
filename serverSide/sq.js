exports.uploadFile = (req, res) => {
	File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer
	}).then(() => {
		res.send('File uploaded successfully! -> filename = ' + req.file.originalname);
	})
}