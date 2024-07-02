const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/userModel');

const users = [
  {
    email: "admin_03@cogniman.eu",
    role: 0,
    password: "@pwdam_032024"
  },
  {
    email: "operator_03@cogniman.eu",
    role: 1,
    password: "@pwdop_032024"
  },
  {
    email: "service_03@cogniman.eu",
    role: 2,
    password: "@pwdsv_032024"
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/croom-hmi00');

    for (let user of users) {
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(user.password, salt);
      // console.log(user.password)
      // user.password = hashedPassword;
      console.log(user.password)
      await new User(user).save();
    }

    console.log('Users inserted successfully.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting users:', error);
  }
};

seedUsers();