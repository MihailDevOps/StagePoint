import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    name
    lastName
    email
    phone
    country
    telegram
    whatsUp
  }
`;

export const USER_NOTIF_CONFIG_FRAGMENT = gql`
  fragment UserFragment on User {
    notificationConfig {
      telegram
      whatsUp
    }
  }
`;