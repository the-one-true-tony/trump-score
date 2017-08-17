// ~~~~~~ Section for MongoDB

import mongoose from 'mongoose';

const mongoDB = 'mongodb://sspy45:fuckthis@ds147979.mlab.com:47979/trump-score';

mongoose.connect(mongoDB, (err) => {
  if (err) return console.log('Error loading database:', err);
  return console.log('Connection sucessful');
});

const WeightSchema = mongoose.Schema({
  pollsterId: Number,
  weight: Number,
});

const Weight = mongoose.model('weight', WeightSchema);

// const db = mongoose.connection;

// ~~~~~~ Section for SQL

import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('ratings', null, null, {
  dialect: 'sqlite',
  storage: './ratings.sqlite',
});

const PollsterModel = db.define('pollster', {
  name: { type: Sequelize.STRING },
});

const PollModel = db.define('poll', {
  type: { type: Sequelize.STRING },
  date: { type: Sequelize.STRING },
  value: { type: Sequelize.INTEGER },
});

PollsterModel.hasMany(PollModel);
PollModel.belongsTo(PollsterModel);

casual.seed(123);

db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return PollsterModel.create({
      name: casual.first_name,
    }).then((pollster) => {
      return Weight.update(
        { pollsterId: pollster.id },
        { weight: casual.integer(0, 100) },
        { upsert: true }
      ).then((pollster) => {
        return pollster.createPoll({
          type: `${pollster} DISAPPROVAL`,
          date: '1/1/2015',
          value: 10,
        });
      });
    });
  });
});

export const Pollster = db.models.pollster;
export const Poll = db.models.poll;
