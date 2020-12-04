const express = require('express');
const connectDB = require('./database/connectDB');
const ErrorMiddleware = require('./middlewares/errorMiddleware');
const RoleRouter = require('./routes/role/route');
const CategoryRouter = require('./routes/category/route');
const UserRouter = require('./routes/user/route');
const auth = require('./routes/api/auth');
require('colors');
const { checkHeader } = require('./middlewares/userMiddleware');

// const jwt = require('jsonwebtoken');
// const token = jwt.sign(
//   { name: 'Phong', email: 'tienphong@gmail.com' },
//   process.env.JWT_SECRET,
//   { expiresIn: '2h' }
// );
// const decode = jwt.verify(token, process.env.JWT_SECRET);
// console.log(decode);
//Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(checkHeader);
app.use('/api/v1/auth', auth);
app.use('/api/v1/role', RoleRouter);
app.use('/api/v1/category', CategoryRouter);
app.use('/api/v1/user', UserRouter);
app.use(ErrorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`.cyan);
});
