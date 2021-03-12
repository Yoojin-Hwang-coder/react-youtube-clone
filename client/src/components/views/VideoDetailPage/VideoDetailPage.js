import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';
import Comment from './Section/Comment';

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const [Comments, setComments] = useState([]);

  const Variable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post('/api/video/getVideo', Variable).then((response) => {
      if (response.data.success) {
        setVideo(response.data.video);
      } else {
        alert('Failed to get video Info');
      }
    });

    axios.post('/api/comment/getComments', Variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert('코멘트 정보들을 가져오는데 실패했습니다.');
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  if (Video.writer) {
    const subscribeButton = Video.writer._id !==
      localStorage.getItem('userId') && (
      <Subscribe
        userTo={Video.writer._id}
        userFrom={localStorage.getItem('userId')}
      />
    );
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div
            className='postPage'
            style={{ width: '100%', padding: '3rem 4em' }}
          >
            <video
              style={{ width: '100%' }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>

            <List.Item actions={[subscribeButton]}>
              <List.Item.Meta
                avatar={
                  <Avatar src={Video.writer.name && Video.writer.image} />
                }
                title={<a href='https://ant.design'>{Video.title}</a>}
                name={Video.writer.name}
                description={Video.description}
              />
            </List.Item>
            <Comment
              refreshFunction={refreshFunction}
              commentLists={Comments}
              postId={videoId}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <div style={{ marginTop: '3rem' }} />
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default withRouter(VideoDetailPage);
