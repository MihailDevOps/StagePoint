/**
 * @format
 */

import { Field, ID, ObjectType } from 'type-graphql';
@ObjectType()
export class NotificationConfig {
  @Field(() => ID)
  userId: string;

  @Field(() => Boolean)
  telegram?: string;

  @Field(() => Boolean)
  whatsUp?: string;
}

@ObjectType()
export class User {
  @Field(() => ID , { nullable: true })
  _id: string;

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
  
  @Field(() => NotificationConfig, { nullable: true })
  notificationConfig: NotificationConfig
}