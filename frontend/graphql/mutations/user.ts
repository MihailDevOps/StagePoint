import { gql } from '@apollo/client';
import { USER_FRAGMENT, USER_NOTIF_CONFIG_FRAGMENT } from '../fragments/user';

export const UPDATE_USER_MUTATION = gql`
  mutation($id: ID!, $name: String, $lastName: String, $email: String, $phone: String, $country: String, $telegram: String, $whatsUp: String) {
    updateUser(id: $id, name: $name, lastName: $lastName, email:$email, phone: $phone, country: $country, telegram : $telegram, whatsUp: $whatsUp) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const UPDATE_USER_NOTIF_CONFIG_MUTATION = gql`
  mutation(
    $userId: ID!,
    $telegram:Boolean,
    $whatsUp:Boolean,
    ){
    updateNotificationConfig(userId: $userId, telegram: $telegram, whatsUp: $whatsUp ){
      ...UserFragment
    }
  }
  ${USER_NOTIF_CONFIG_FRAGMENT}
`