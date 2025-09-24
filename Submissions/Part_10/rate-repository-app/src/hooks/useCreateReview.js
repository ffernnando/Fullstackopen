import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client/react'

const useCreateReview = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(CREATE_REVIEW);
 
  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    console.log('getting called createReview: ', ownerName, rating, repositoryName, text);

    const response = await mutate({
      variables: { ownerName: ownerName, rating: rating, repositoryName: repositoryName, text: text }
    });
    
    console.log('CreateReview response -- AJ DI: ', response.data.createReview.repositoryId);
    return response.data.createReview.repositoryId;
  };

  return [createReview, result];
};

export default useCreateReview;