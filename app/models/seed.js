const mongoose = require('mongoose');
const Expense = require('./expense');

const db = require('../../config/db');

const startExpenses = [
  {
    amount: 900,
    vendor: 'Point Place',
    category: 'Rent/Utilities/Phone',
    description: 'Rent',
    date: '11/12/2021',
  },
  {
    amount: 80,
    vendor: 'Verizon',
    category: 'Rent/Utilities/Phone',
    description: 'Phone bill',
    date: '11/15/2021',
  },
  {
    amount: 180,
    vendor: 'Honda',
    category: 'Car/Transportation/Gas',
    description: 'Car note',
    date: '11/08/2021',
  },
  {
    amount: 42,
    vendor: 'Giant',
    category: 'Groceries',
    description: 'Eggs, chicken, bananas',
    date: '11/18/2021',
  },
  {
    amount: 102,
    vendor: 'Del Mar',
    category: 'Personal Unnecessary',
    description: 'Date with X',
    date: '11/09/2021',
  },
  {
    amount: 600,
    vendor: 'TD Ameritrade',
    category: 'Investment',
    description: 'Extra money avail to invest',
    date: '11/12/2021',
  },
];

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    // then we remove all the expense
    Expense.deleteMany({ owner: null })
      .then((deletedExpenses) => {
        console.log('deleted expenses', deletedExpenses);
        // then we create using the startExpenses array
        // we'll use console logs to check if it's working or if there are errors
        Expense.create(startExpenses)
          .then((newExpenses) => {
            console.log('the new expenses', newExpenses);
            mongoose.connection.close();
          })
          .catch((err) => {
            console.log(err);
            mongoose.connection.close();
          });
      })
      .catch((error) => {
        console.log(error);
        mongoose.connection.close();
      });
  })
  // then at the end, we close our connection to the db
  .catch((error) => {
    console.log(error);
    mongoose.connection.close();
  });
