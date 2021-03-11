import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Subscribe(props) {
  const [subscribeNumber, setsubscribeNumber] = useState(0);
  const [subscribed, setsubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };

    Axios.post('/api/subscribe/subscribeNumber', variable).then((response) => {
      if (response.data.success) {
        setsubscribeNumber(response.data.subscribeNumber);
      } else {
        alert('구독자 수 정보를 가져오지 못했습니다.');
      }
    });

    let subscribeddVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    Axios.post('/api/subscribe/subscribed', subscribeddVariable).then(
      (response) => {
        if (response.data.success) {
          setsubscribed(response.data.subscribed);
        } else {
          alert('구독 정보를 가져오지 못했습니다.');
        }
      }
    );
  }, []);

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    if (subscribed) {
      Axios.post('/api/subscribe/unSubscribe', subscribeVariable).then(
        (response) => {
          if (response.data.success) {
            setsubscribeNumber(subscribeNumber - 1);
            setsubscribed(!subscribed);
          } else {
            alert('구독 취소하는데 실패 했습니다.');
          }
        }
      );
    } else {
      Axios.post('/api/subscribe/subscribe', subscribeVariable).then(
        (response) => {
          if (response.data.success) {
            setsubscribeNumber(subscribeNumber + 1);
            setsubscribed(!subscribed);
          } else {
            alert('구독 하는데 실패 했습니다.');
          }
        }
      );
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
          border: 'none',
        }}
        onClick={onSubscribe}
      >
        {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;
