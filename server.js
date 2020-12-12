const express = require('express');
const connectDB = require('./database/connectDB');
const ErrorMiddleware = require('./middlewares/errorMiddleware');
const RoleRouter = require('./routes/role/route');
const CategoryRouter = require('./routes/category/route');
const UserRouter = require('./routes/user/route');
const auth = require('./routes/auth/auth');
require('colors');

connectDB();

const app = express();
app.use(express.json());
// app.use(authMiddleware);

app.use('/api/v1/auth', auth);
app.use('/api/v1/role', RoleRouter);
app.use('/api/v1/category', CategoryRouter);
app.use('/api/v1/user', UserRouter);
app.use(ErrorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`.cyan);
});
