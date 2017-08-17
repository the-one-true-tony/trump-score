import { Pollster, Weight } from './connectors';

const resolvers = {
  Query: {
    pollster(root, args) {
      return Pollster.find({ where: args });
    },
  },
  Pollster: {
    polls(pollster) {
      return pollster.getPolls();
    },
    weight(pollster) {
      return Weight.findOne({ pollsterId: pollster.id })
        .then((weight) => weight.weight);
    },
  },
  Poll: {
    pollster(poll) {
      return poll.getPollster();
    },
  },
};

export default resolvers;
