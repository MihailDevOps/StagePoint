import { IResolvers  } from '@graphql-tools/utils';

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: {id: string, new: string}): {name:string} {
      console.log('helloworld')
      console.log(args)
  return {name: `👋 Hello world! 👋`};
    },
  },
};
export default resolverMap;