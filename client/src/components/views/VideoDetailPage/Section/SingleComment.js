import { Comment, Avatar } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {
  const [OpneReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const user = useSelector((state) => state.user);

  const onHandleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onClickReplyOpen = () => {
    setOpenReply(!OpneReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    Axios.post('/api/comment/commentSave', variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue('');
        setOpenReply(false);
      } else {
        alert('코멘트를 저장하지 못했습니다.');
      }
    });
  };

  const actions = [
    <LikeDislikes
      userId={localStorage.getItem('userId')}
      commentId={props.comment._id}
    />,
    <span onClick={onClickReplyOpen} key='comment-basic-reply-to'>
      Relpy to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{props.comment.content}</p>}
      />

      {OpneReply && (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder='Write your comment'
          />
          <br />
          <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
            {' '}
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default withRouter(SingleComment);
