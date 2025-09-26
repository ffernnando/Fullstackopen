import { useMutation } from '@apollo/client/react';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ( deleteReviewId, refetch ) => {
    console.log('Getting called to delete a review with: ', deleteReviewId);

    const response = await mutate({
      variables: { deleteReviewId: deleteReviewId },
    })
    console.log('DeleteReview response data: ', response );
    console.log('Refetching!');
    refetch();
    return response;
  }

  return [deleteReview, result];
};

export default useDeleteReview;