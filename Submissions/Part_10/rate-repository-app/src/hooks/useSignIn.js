import { useMutation } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { username: username, password: password }
    });
    console.log('SignIn response: ', response);
    return response;
  };

  return [signIn, result];
};

export default useSignIn;