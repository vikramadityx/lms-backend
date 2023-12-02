const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    type: Object,
    required: true
  }
});

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;
