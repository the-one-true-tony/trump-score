import { Pollster, Poll } from './connectors';

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
  },
  Poll: {
    pollster(poll) {
      return poll.getPollster();
    },
  },
};

export default resolvers;
