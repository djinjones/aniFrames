const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      adminType: {
        type: String,
        enum: ['none', 'admin', 'owner'],
        default: 'none',
        required: true,
      }
    },
  );

  userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = model('User', userSchema);