import http from 'k6/http';
import { group } from 'k6';

const baseUrl = "http://223.130.133.168:3000"

export const options = {
    stages: [
      //load test
      // { duration: '10s', target: 10 }, // traffic ramp-up from 1 to 100 users over 1m.
      // { duration: '60s', target: 10 }, // stay at 100 users for 6m
      // { duration: '10s', target: 0 }, // ramp-down to 0 users
      //spike test
      { duration: '2m', target: 30 }, // fast ramp-up to a high point
      { duration: '1m', target: 0 }, // quick ramp-down to 0 users
    ],
    thresholds: {
      http_req_failed: ['rate<0.01'], // http error가 1% 이하여야 한다.
      http_req_duration: ['p(95)<200'], // 95%의 요청이 200ms 아래여야 한다.
    },
  };

export default function () {
  group('without login - batch', function () {
    group("post", function() {
      http.batch([
        ['GET', `${baseUrl}/posts`],
        ['GET', `${baseUrl}/posts/camps/camp1`],
        ['GET', `${baseUrl}/posts/1`],
        ['GET', `${baseUrl}/posts/1/likes`],
        ['GET', `${baseUrl}/posts/1/comments`],
      ])
    })
    // group("camp", function() {
    //   http.get(`${baseUrl}/camps/subscriptions`,{  cookies: {
    //     publicId : "camper1",
    //     isMaster : false
    //   },})
    // });
    // group("chat", function() {
    //   http.get(`${baseUrl}/chats/master1?cursor=2023-12-29T02:36:43.152Z`,{  cookies: {
    //     publicId : "camper1",
    //     isMaster : false
    //   },})
    // });
  })
}
