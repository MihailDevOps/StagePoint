import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';

export const USER_QUERY = gql`
  query User($id: String!){
    helloWorld(id: $id){
      name
    }
  }
`;