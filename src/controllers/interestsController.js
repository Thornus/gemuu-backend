import Interest from '../models/Interest';

async function getInterests(req, res) {
	let interests = await Interest.find();
	res.send({interests});
}

module.exports = {getInterests};
