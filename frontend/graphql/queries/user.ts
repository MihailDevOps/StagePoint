import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      ...UserFragment
      notificationConfig {
        telegram
        whatsUp
      }
    }
  }
  ${USER_FRAGMENT}
`;