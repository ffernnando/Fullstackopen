import { useMutation } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client/react'



const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);
 

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { username: username, password: password }
    });
    console.log('SignIn response: ', response.data.authenticate.accessToken);
    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();
    return response.data.authenticate.accessToken;
  };

  return [signIn, result];
};

export default useSignIn;