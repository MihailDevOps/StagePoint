import "reflect-metadata";
import { Field, ID, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
export class Subscription {
  @Field()
  id: string = '';
}

@Resolver()
export class UserResolver {
  @Query(() =>  Subscription)
  async user(
    // @Args() { id }: GetUserArgs
  ) {
    // const user = await UserModel.findOne({ _id: id }).lean();
    // const notificationConfig = await NotificationConfigModel.findOne({ user: id })
    // return { ...user, id: user._id, notificationConfig }
  }
}