// import React, { useEffect, useState } from 'react';
// import { List, Avatar, Col, Row } from 'antd';
// import Axios from 'axios';

// function VideoDetailPage(props) {
//   console.log(props);
//   const videoId = props.match.params.videoId;

//   const videoVariable = {
//     videoId: videoId,
//   };
//   const [Video, setVideo] = useState([]);

//   useEffect(() => {
//     Axios.post('/api/video/getVideoDetail', videoVariable).then((response) => {
//       if (response.data.success) {
//         setVideo(response.data.video);
//       } else {
//         alert('비디오 가져오기를 실패했습니다.');
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <Row gutter={[16, 16]}>
//         <Col lg={18} xs={24}>
//           <div style={{ width: '100%', padding: '3rem 4rem' }}>
//             <video
//               style={{ width: '100%' }}
//               scr={`http://loacalhost:5000/${Video.filePath}`}
//               controls
//             />
//             <List.Item action>
//               <List.Item.Meta
//                 avatar={<Avatar src={Video.writer.image} />}
//                 title={Video.writer.name}
//                 description={Video.description}
//               />
//             </List.Item>
//           </div>
//         </Col>
//         <Col lg={6} xs={24}>
//           side video
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default VideoDetailPage;
