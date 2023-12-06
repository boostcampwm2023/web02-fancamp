import http from "k6/http";
import { group } from "k6";

const baseUrl = "http://localhost:3000";

export const options = {
  stages: [{ target: 500, duration: "30s" }],
  thresholds: {
    http_req_failed: ["rate<0.01"], // http error가 1% 이하여야 한다.
    http_req_duration: ["p(95)<200"], // 95%의 요청이 200ms 아래여야 한다.
  },
};

export default function () {
  group("without login - batch", function () {
    // group("post", function() {
    //   http.batch([
    //     ['GET', `${baseUrl}/posts`],
    //     ['GET', `${baseUrl}/posts/camps/camp1`],
    //     ['GET', `${baseUrl}/posts/1`],
    //     ['GET', `${baseUrl}/posts/1/likes`],
    //     ['GET', `${baseUrl}/posts/1/comments`],
    //   ])
    // })
    // group("camp", function() {
    //   http.get(`${baseUrl}/camps/subscriptions`,{  cookies: {
    //     publicId : "camper1",
    //     isMaster : false
    //   },})
    // });
    group("chat", function () {
      http.get(`${baseUrl}/chats/master1?cursor=2023-12-29T02:36:43.152Z`, {
        cookies: {
          publicId: "camper1",
          isMaster: false,
        },
      });
    });
  });
}
