import "reflect-metadata";
import { Field, ID, ObjectType, Query, Resolver, Args, ArgsType, Mutation } from "type-graphql";
import { UserModel } from "../../mongodb/models/usersModel";
import { User } from "../types/user";

@ArgsType()
class GetUser {
  @Field(() => ID)
  id: string;
}


@ArgsType()
class UpdateUser {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  telegram?: string;

  @Field(() => String, { nullable: true })
  whatsUp?: string;
}

@Resolver()
export class UserResolver {
  @Query(() =>  User)
  async user(
    @Args() { id }: GetUser
  ) {
    console.log(id)
    const user = await UserModel.findOne({ _id: id })
    console.log(user)
    return user
  }

  @Mutation(() =>  User)
  async updateUser(
    @Args() { id, name, lastName, email, phone, country, telegram, whatsUp }: UpdateUser
  ) {
    console.log(id, name, lastName, email, phone, country, telegram, whatsUp)
    const user = await UserModel.findOneAndUpdate({ _id: id }, {
      name, 
      lastName, 
      email, 
      phone, 
      country, 
      telegram, 
      whatsUp
    })
    console.log(user)
    return user
  }
}