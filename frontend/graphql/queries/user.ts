import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';

export const USER_QUERY = gql`
  query User($name: String!, lastName: String!){
    helloWorld(name: $name, lastName: $lastName){
      name
      lastName
    }
  }
`;