import mongoose from 'mongoose';

function getModel() {
	let userSchema = mongoose.Schema({
		username: { type: String, required: true },
		password: { type: String, required: true },
		email:    { type: String, required: true },
		firstName: { type: String },
		lastName: { type: String },

		created: { type: Date, default: Date.now }
		// active: { type: Boolean, default: false }
	});

	return mongoose.model('User', userSchema);
};

const User = getModel();

export default User;
