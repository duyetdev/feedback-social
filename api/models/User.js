/**
 * User
 * @description :: Model for storing users
 */
module.exports = {
	schema: true,
	attributes: {
		username: {
			type: 'string',
			required: true,
			unique: true,
		},
		password: {
			type: 'string'
		},
		email: {
			type: 'string',
			// email: true,
			required: true,
			unique: true
		},
		displayName: {
			type: 'string',
			defaultsTo: ''
		},
		gender: {
			type: 'string',
			defaultsTo: ''
		},
		photo: {
			type: 'string',
			defaultsTo: '',
			url: true
		},
		socialProfiles: {
			type: 'object',
			defaultsTo: {}
		},

		// Facebook user id
		// Indeed, I can't find better way to find in attribute in deep level,
		// to fix that, I move to top level attribute
		// TODO: Fix that!!
		facebook_id: {
			type: 'string',
			defaultsTo: '',
		},
 
		toJSON: function () {
			var obj = this.toObject();
			delete obj.password;
			delete obj.socialProfiles;
			return obj;
		}
	},
	beforeUpdate: function (values, next) {
		CipherService.hashPassword(values);
		next();
	},
	beforeCreate: function (values, next) {
		CipherService.hashPassword(values);
		next();
	}
};