import React, { useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Box, Button, Typography } from '@mui/material';
import { addComment } from '../store';

const ADD_COMMENTS = gql`
  mutation Mutation(
    $owner: ID!
    $text: String!
    $type: String!
    $postId: ID
    $refId: ID
  ) {
    addComment(
      owner: $owner
      text: $text
      type: $type
      postId: $postId
      refId: $refId
    ) {
      id
      text
      owner {
        nickname
        id
      }
      createdAt
    }
  }
`;

const getVariables = (args) => {
  const { type, refId } = args;
  if (type === 'post') {
    return { ...args, postId: refId };
  } else {
    return { ...args };
  }
};

const CommentBox = (props) => {
  const [addComments] = useMutation(ADD_COMMENTS);
  const commentBox = useRef();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const addComment = async (data) => {
    const { comment: text } = data;
    const owner = JSON.parse(localStorage.getItem('user')).id;
    const { type, refId } = props.getTypeAndId();
    const variables = getVariables({ text, owner, type, refId });
    try {
      const addedComment = await addComments({ variables });
      props.comment(addedComment.data.addComment);
      commentBox.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };
  const onError = (error) => {
    console.log(error, errors);
  };
  return (
    <div style={{ height: '100%', paddingTop: 80 }}>
      <Typography component="h3" variant="h4">
        Comments
      </Typography>
      <Box component="form" onSubmit={handleSubmit(addComment, onError)}>
        <Controller
          name="comment"
          control={control}
          rules={{
            required: true,
          }}
          render={() => (
            <TextField
              {...register('comment')}
              type="text"
              margin="normal"
              required
              fullWidth
              label="Leave comments"
              inputRef={commentBox}
            />
          )}
        />

        <Button
          type="submit"
          variant="outlined"
          fullWidth
          style={{ color: 'black', borderBlockColor: 'black' }}
          sx={{ mt: 3, mb: 2 }}
        >
          Leave comment
        </Button>
      </Box>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  comment: (comment) => {
    dispatch(addComment(comment));
  },
});

export default connect(null, mapDispatchToProps)(CommentBox);
