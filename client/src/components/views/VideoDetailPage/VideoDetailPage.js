import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';

function VideoDetailPage(props) {
  console.log(props);
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post('/api/video/getVideo', videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert('Failed to get video Info');
      }
    });
  }, []);

  if (Video.writer) {
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

            <List.Item
              actions={[
                <Subscribe
                  userTo={Video.writer._id}
                  userFrom={localStorage.getItem('userId')}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href='https://ant.design'>{Video.title}</a>}
                description={Video.description}
              />
            </List.Item>
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
