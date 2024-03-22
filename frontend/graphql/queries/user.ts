import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';

export const USER_QUERY = gql`
  query User($address: Sting!) {
    user(address: $address) {
      ...UserFragment
      notificationConfig {
        telegram
        whatsApp
      }
    }
  }
  ${USER_FRAGMENT}
`;