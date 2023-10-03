import { IResolvers  } from '@graphql-tools/utils';
import { IUser } from '../types/user';
const userResolver: IResolvers = {
  Query: {
    getUser(_: void, args: {name: string, lastName: string}): IUser {
      return {name: args.name, lastName: args.lastName}
    },
  },
  Mutation: {

  }
};
export default userResolver;