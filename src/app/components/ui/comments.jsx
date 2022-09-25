import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import FormComment from './FormComment';
import CommentsList from './commentsList';

const Comments = ({id}) => {
    const [comment, setComment] = useState([]);
    useEffect(() => {
        api.comments.fetchCommentsForUser(id).then(data => setComment(data));
    }, []);

    const handleAddComment = (data) => {
        api.comments.add({...data, pageId: id}).then(data => setComment(prevState => [...prevState, data]));
    };

    const handleRemove = (id) => {
        api.comments.remove(id).then(data => setComment(comment.filter(com => com._id !== data)));
    };

    const commentsSort = [...comment].sort((a, b) => Number(b.created_at) - Number(a.created_at));
    return (
        <>
            <div className="card mb-2">
                <div
                    style={{display: 'flex', flexDirection: 'column'}}
                    className="card-body"
                >
                    <FormComment handleAddComment={handleAddComment} />
                </div>
            </div>
            {
                commentsSort.length > 0 &&
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr/>
                        <CommentsList
                            comments={commentsSort}
                            handleRemove={handleRemove}
                        />
                    </div>
                </div>
            }
        </>
    );
};
Comments.propTypes = {
    id: PropTypes.string
};

export default Comments;
