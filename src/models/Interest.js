import mongoose from 'mongoose';

function getModel() {
	let interestSchema = mongoose.Schema({
		name: { type: String, required: true },
		followers: { type: Number, required: true },
		imgPath:    { type: String, required: true },

		created: { type: Date, default: Date.now }
	});

	return mongoose.model('Interest', interestSchema);
};

const Interest = getModel();

export default Interest;
