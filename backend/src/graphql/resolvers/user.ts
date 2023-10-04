import "reflect-metadata";
import { Field, ID, ObjectType, Query, Resolver, Args, ArgsType } from "type-graphql";
import { UserModel } from "../../mongodb/models/usersModel";
import { User } from "../types/user";

@ArgsType()
class GetUser {
  @Field(() => ID)
  id: string;
}

@Resolver()
export class UserResolver {
  @Query(() =>  User)
  async user(
    @Args() { id }: GetUser
  ) {
    console.log(id)
    const user = await UserModel.findById({ _id: id})
    return user
  }
}