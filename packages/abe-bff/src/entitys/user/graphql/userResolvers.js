import userService from '../services/userService';

const resolvers = {
    Query: {
        user: async (_, { id }) => {
            try {
                const user = await userService.getUserById(id);
                return user;
            } catch (error) {
                throw new Error('User not found');
            }
        },
    },
};

export default resolvers;
