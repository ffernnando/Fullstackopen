import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client/react'

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(CREATE_USER);
 

  const signUp = async ({ username, password }) => {
    const response = await mutate({
      variables: { username: username, password: password }
    });
    console.log('SignUp response: ', response.data.createUser);
    
    return response.data.createUser;
  };

  return [signUp, result];
};

export default useSignUp;