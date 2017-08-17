import casual from 'casual';

const mocks = {
  String: () => 'It works!',
  Integer: () => 'Ints work too',
  Date: () => new Date(),
  Query: () => ({
    pollster: (root, args) => {
      return { name: args.name };
    },
  }),
  Pollster: () => ({
    name: casual.first_name,
  }),
  Poll: () => ({
    type: casual.sentences(1),
  }),
};

export default mocks;
