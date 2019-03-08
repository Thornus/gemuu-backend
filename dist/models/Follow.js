'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Follow = function Follow() {
	var followSchema = mongoose.Schema({
		follower: { type: Schema.Types.ObjectId, required: true },
		followee: { type: Schema.Types.ObjectId, required: true },

		created: { type: Date, default: Date.now }
	});

	return mongoose.model('Follow', followSchema);
};

exports.default = Follow;