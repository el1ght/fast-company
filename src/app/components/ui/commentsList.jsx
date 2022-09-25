import React from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';

const CommentsList = ({comments, handleRemove}) => {
    return comments.map(comment => (
        <Comment key={comment._id} comment={comment} handleRemove={handleRemove} />
    ));
};
CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
    handleRemove: PropTypes.func.isRequired
};
export default CommentsList;
