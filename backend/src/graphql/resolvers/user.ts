import "reflect-metadata";
import { Field, ID, ObjectType, Query, Resolver, Args, ArgsType, Mutation } from "type-graphql";
import { UserModel } from "../../mongodb/models/usersModel";
import { User } from "../types/user";
import { NotificationConfigModel } from "../../mongodb/models/notificationsModel";

@ArgsType()
class GetUser {
  @Field(() => ID)
  id: string;
}

@ArgsType()
class UpdateNotifConfigArgs{
  @Field(() => ID)
  userId?: string;

  @Field(() => Boolean, {nullable: true})
  telegram?: boolean;

  @Field(() => Boolean, {nullable: true})
  whatsUp?: boolean;

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
    const user = await UserModel.findOne({ _id: id }).lean();
    const notificationConfig = await NotificationConfigModel.findOne({ user: id } ).lean();
    console.log(notificationConfig)
    return {...user, notificationConfig }
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

  @Mutation(() =>  User)
  async updateNotificationConfig(
    @Args() { userId, telegram, whatsUp }: UpdateNotifConfigArgs
  ) {
    const user = await UserModel.findOne({ _id: userId }).lean();
    const updateData: Record<string, boolean> = {};
    console.log(typeof whatsUp !== 'undefined')
    console.log(!!user.whatsUp)
    console.log(typeof telegram !== 'undefined' && !!user.telegram)
    if (typeof telegram !== 'undefined' && !!user.telegram) {
      updateData.telegram = telegram;
    }

    if (typeof whatsUp !== 'undefined' && !!user.whatsUp) {
      updateData.whatsUp = whatsUp;
    }
    console.log(updateData)
    const notificationConfig = await NotificationConfigModel.findOneAndUpdate({ user: userId }, 
      {
        $set: updateData,
      },
      {
        upsert: true,
        new: true
      }
    )
    return notificationConfig
  }
}