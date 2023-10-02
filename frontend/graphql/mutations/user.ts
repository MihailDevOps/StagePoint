import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';

export const UPDATE_USER_MUTATION = gql`
  mutation($id: ID!, $email: String!, $phone: String!, $country: String!, $showContacts: Boolean!, $job: String!) {
    updateUser(id: $id, email:$email, phone: $phone, country: $country, showContacts: $showContacts, job: $job) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;