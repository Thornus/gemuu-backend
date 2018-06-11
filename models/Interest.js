import mongoose from 'mongoose';

function getModel() {
	let interestSchema = mongoose.Schema({
		name: { type: String, required: true },
		password: { type: String, required: true },
		imgPath:    { type: String, required: true },

		created: { type: Date, default: Date.now }
	});

	return mongoose.model('Interest', interestSchema);
};

const Interest = getModel();

export default Interest;
