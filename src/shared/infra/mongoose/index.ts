import { connect } from 'mongoose';

connect(`${process.env.MONGO_URI}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
