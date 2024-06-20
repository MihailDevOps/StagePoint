import { User, NFTPlan, PoolRecord, Transaction } from './models';
// import User from './models/User'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  User.sync({ alter: isDev });
  NFTPlan.sync({alter: isDev});
  PoolRecord.sync({alter: isDev});
  Transaction.sync({alter: isDev});
}

export default dbInit;