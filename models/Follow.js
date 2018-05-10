export default const Follow = () => {
	let followSchema = mongoose.Schema({
		follower: { type: Schema.Types.ObjectId, required: true },
		followee: { type: Schema.Types.ObjectId, required: true },

		created: { type: Date, default: Date.now }
	});

	return mongoose.model('Follow', followSchema);
}
