import { Schema, Types, model } from "mongoose";
import { INotificationConfigDocument, INotificationConfigModel } from "../../types/types";

const NotificationConfigSchema = new Schema<INotificationConfigDocument>({
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Notifications should belong to user'],
    },
    telegram: {
      type: Boolean,
      required: [true, 'telegram should be provided'],
    },
    whatsUp: {
      type: Boolean,
      required: [true, 'whatsUp should be provided'],
    },
})

export const NotificationConfigModel = model<INotificationConfigDocument, INotificationConfigModel>('NotificationConfig', NotificationConfigSchema)
  