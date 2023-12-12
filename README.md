# fancamp

> **인플루언서와 팬과 소통하는 커뮤니티**
> 

## 프로젝트 소개

```
영상으로만 보던 인플루언서분들과 실시간으로 소통을 해보세요. 
인플루언서라면 팬분들과 일상을 공유하며 친밀감을 올릴 수 있어요. 😊
```

### 주제 선정 이유

```
저희 팀 잼버리는 멤버 전원이 웹 개발 협업이 처음이었어요.
그래서 기획에 신경을 덜 쓰고 싶어 새로운 서비스를 만들기보다는
이미 존재하는 서비스인 Weverse와 bubble을 참고했어요.

SNS 서비스에 공통적으로 있는 포스트, 피드, 실시간 채팅, 검색 기능은
웹 서비스에서 흔히 사용되어 이번 기회에 학습하고 구현해보면 추후에 도움이
될 것 같아 이 주제를 선택하게 되었어요. 😎
```

## 기능 소개

### 주요 기능

1. 포스트 및 코멘트 실시간 업데이트
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/842cd70d-0938-4b8d-a68c-bacd994109ca/Untitled.gif)
    
2. 피드
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/bbb2e23a-d769-444e-b9a6-7c9573a259d2/Untitled.gif)
    
3. 채팅

![채팅.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/cec7f65b-d2c4-45e1-9894-e104a67e9bd2/%EC%B1%84%ED%8C%85.png)

### 전체 기능

- 기능 리스트
    
    ### 포스트
    
    - 이미지를 업로드할 수 있어요.
    - 동영상을 업로드하고 썸네일을 볼 수 있어요.
    - 새로운 포스트가 올라오면 실시간으로 확인할 수 있어요.
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/842cd70d-0938-4b8d-a68c-bacd994109ca/Untitled.gif)
        
    - 이전 코멘트을 무한 스크롤로 더 가져올 수 있어요.
    - 좋아요 버튼을 누르고 코멘트을 달 수 있어요.
    - AI로 코멘트의 감정을 분석해서 감정에 따라다 색을 다르게 보여줘요. 긍정적이면 초록, 부정적이면 빨강, 중립이면 파란색으로 표현이 돼요.
    - 포스트 내용과 코멘트가 한글/영어/일본어로 볼 수 있어요.
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/19b2481c-ba09-47e0-bbde-933fae41d1ca/Untitled.gif)
        
    
    ### 피드
    
    - Youtube Shorts처럼 무한 슬라이더로 최근 포스트를 이동하며 볼 수 있어요.
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/bbb2e23a-d769-444e-b9a6-7c9573a259d2/Untitled.gif)
        
    
    ### 채팅
    
    - 실시간으로 채팅을 나눌 수 있어요.
    - 무한 스크롤로 이전 메시지를 불러올 수 있어요.
    - 마스터가 현재 채팅에 접속 중인지 알 수 있어요.
    - 마스터가 채팅에 `(닉네임)` 을 적을 경우 캠퍼의 화면에서는 캠퍼의 닉네임으로 변경돼서 마치 1 대 1로 채팅을 하는 느낌을 받을 수 있어요.
    
    ### 캠프
    
    - 캠프 목록에서 관심 있는 인플루언서의 캠프로 이동할 수 있어요.
    - 캠프를 검색할 수 있어요.
    
    ### 알림
    
    - 마스터가 채팅을 보낼 때 알림을 받아볼 수 있어요.
    - 마스터가 새로운 포스트 등록 시 알림을 받아볼 수 있어요.

---

## 기술  소개 (이유 + 적용 사례, 해결한 문제)

### React

JavaScript의 DOM API를 사용해서 UI를 만들면 어떻게 표현할 것인가에 대한 로직의 코드의 상당 부분을 차지하게 됩니다. 리액트에서 제공하는 상태 관리 API와 JSX 문법을 이용하면 `선언적`으로 `무엇을` 표현할 것인가를 나타낼 수 있어 코드가 간결해집니다. 뷰를 컴포넌트 단위로 나누어 `재사용 성과 유지 보수`가 쉬워집니다.

### Tailwind CSS

CSS를 작성할 때 더 이상 `클래스 네임` 때문에 고민하지 않아도 됩니다. JSX의 CSS를 작성할 때 파일을 바꾸면서 작성하지 않고 JSX 한 파일 내에서 해당하는 HTML 태그의 CSS를 바로 확인할 수 있습니다. 사이즈, 색깔, 폰트 등 `디자인 시스템`을 정의하기 간편합니다.

### TanStack Query

`비동기 상태 관리` 라이브러리로써 비동기 상태의 loading, error, success를 간결하게 UI에 표현할 수 있고 caching, refetching, retry, enabled, pagination, infinite scroll, optimistic UI 등 여러 기능 및 옵션을 지원합니다. 비동기 상태를 Query Key로 관리하여 커스텀 훅으로 만들면 어떤 컴포넌트 내에서도 일정한 결과를 얻을 수 있고 mutation API를 사용하면 서버 상태와 클라이언트 상태와의 동기화도 간단합니다.

### Nest.js

> node.js 기반의 프레임워크를 사용한다. 언어는 JavaScript 또는 TypeScript를 사용한다.
> 

앞선 요구사항을 만족하는 프레임워크 중에서 `Nest.js`를 선택한 이유는 정해진 구조로 협업 효율을 높이고, 만들어진 데코레이터를 쉽게 사용해서 효율적으로 개발하기 위함이었습니다.

이에 더하여 의존성 검증을 해줘서 오류를 보고 해결을 편하게 할 수 있었습니다.

[의존성 순환](https://www.notion.so/42c31f729cea4fbb82f55ac90f7822c0?pvs=21) 

### MySQL

서비스에서 사용하는 데이터가 유저, 구독, 캠프, 포스트 등 대부분 연관되어 있고, 자주 변경이 일어날 수 있어서 RDBMS 사용했습니다. 

### Socket.IO

polling, long-polling, WebSocket 등 여러 실시간 통신 기술 중 Socket.IO를 사용한 이유는 `namespace`와 `room` 기능을 사용해서 빠르게 개발하고자 했기 때문입니다.

### PM2, Prometheus, Grafana

다양한 이유로 갑자기 프로세스가 종료될 때 바로 재시작하기 위해서 `PM2` 도입했습니다. 이후 추가적인 코드 작성 없이 로그를 관리할 수 있었고, cluster 모드를 활용해 멀티 스레드를 구현할 수 있었습니다.

최적화할 부분을 찾기 위해 모니터링이 필요했습니다. 그래서 시각화를 위해 `Grafana`를, 호스트 머신 레벨 데이터와 Node 애플리케이션 데이터를 얻기 위해 `Prometheus` 도입했습니다. 이후 `k6`로 부하 테스트를 진행하면서 `Grafana`로 실시간으로 결과를 보면서 분석했습니다.

[성능 테스트 part 1 - 도입](https://www.notion.so/part-1-e29517c82db1495385200f872fc07b81?pvs=21) [성능 테스트 part 2 (작성중)](https://www.notion.so/part-2-ef7cddcf49da4ee99f3a5eb0f23097de?pvs=21) 

---

## 기술적 고민

### 프론트엔드

**재사용성을 생각한 컴포넌트 설계**

코드의 중복을 막기 위해 함수로 분리하는 것처럼, 요소의 중복 또한 컴포넌트로 분리해야 된다고 생각합니다. 그리고 컴포넌트로 분리할 때 가장 중요한 점은 그 컴포넌트의 목적을 명확하게 하고, 다양한 상황에 사용할 수 있도록 만드는 것이라고 생각했습니다.

[[FE] ****공통 컴포넌트 만들기****](https://www.notion.so/FE-e641dd4dbf754288a6fb74f1d55c647d?pvs=21)

**무한 스크롤 및 무한 슬라이더**

무한 스크롤과 무한 슬라이더를 만들면서, 동시에 확장성과 최적화를 고민했습니다. 재사용을 위해 필요한 로직을 커스텀 훅으로 분리하고, 최적화를 위해 컴포넌트의 구조와 동작 자체를 다시 설계하는 등 많은 기술적 고민을 했습니다.

[[FE] 유튜브 쇼츠 같은 컴포넌트 만들기](https://www.notion.so/FE-2fbc3d8c47b942078eb8890d46505aba?pvs=21)

### 백엔드

**모니터링**

테스트가 처음이라서 최적화할 지표를 찾는 것이 고민이었습니다. 그래서 실시간으로 변하는 그래프를 보면 빠르게 찾을 것 같아서 Grafana와 Prometheus를 도입했습니다. Prometheus 서버와 exporter 등의 개념을 이해하고 적용했고, 테스트를 하면서 CPU 사용률과 이벤트 루프 시간을 개선하기로 결정했습니다.

[성능 테스트 part 1 - 도입](https://www.notion.so/part-1-e29517c82db1495385200f872fc07b81?pvs=21) [성능 테스트 part 2 (작성중)](https://www.notion.so/part-2-ef7cddcf49da4ee99f3a5eb0f23097de?pvs=21) 

**채팅과 알림**

채팅뿐만 아니라 포스트와 댓글 업데이트를 소켓으로 새로고침 없이 자동 업데이트하기 위해 `chat`, `post`, `page`, `notice` 4개의 `namespace`와 각 요소 `ID`를 `room`으로 하여 관리하였습니다.  

처음에는 단순 DB 저장만 있던 과정이 API와 알림, 소켓을 통한 update 등 과정이 복잡해지면서 이해를 위해 정리하고, 그림을 그렸습니다.

- 댓글, 포스트 생성 Flow
    
    ![사용자가 댓글 작성 → `Clova Sentiment`로 감정 분석 후 색깔 생성 → `DB`에 저장 → `socket` 해당 페이지에 있는 사람들에게 `Comment Update`](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/3df58da8-b802-4834-919d-268f0a424ac9/Untitled.png)
    
    사용자가 댓글 작성 → `Clova Sentiment`로 감정 분석 후 색깔 생성 → `DB`에 저장 → `socket` 해당 페이지에 있는 사람들에게 `Comment Update`
    
    ![사용자가 포스트 작성 → `PaPago`로 번역, `ncloud storge`에 업로드 → `DB`에 저장 → `socket` 해당 페이지에 있는 사람들에게 `Post emit`, 구독 중인 사용자에게 `Notice emit`](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/f43ee625-efe3-4c9d-a6b9-6e7608125916/Untitled.png)
    
    사용자가 포스트 작성 → `PaPago`로 번역, `ncloud storge`에 업로드 → `DB`에 저장 → `socket` 해당 페이지에 있는 사람들에게 `Post emit`, 구독 중인 사용자에게 `Notice emit`
    

[채팅 상세기능 정하기 - 소켓 정리](https://www.notion.so/df6147a7c2f844f095ef643b1e7abd8e?pvs=21) 

**DB 성능 측정**

`NoSQL`인 `MongoDB`를 그나마 관계가 떨어져 있는 `채팅 DB`에만 적용해 봤는데, `MySQL`과 읽기와 쓰기 성능 차이가 별로 없었습니다. 

[MySQL과 MongoDB 성능 측정하기](https://www.notion.so/MySQL-MongoDB-e260366224174463a6f303207aa98674?pvs=21) 

---

## 협업방식

### Notion

프로젝트를 나중에 더 잘 기억하고, 협업 시 발생한 어려움을 해결하기 위해 특별히 신경 쓴 페이지들이 있습니다. 

- **데일리 회고**📄 : 매주 KPT 방법으로 회고하는 것과 별개로, 매일 일기장처럼 개발하면서 느낀 점을 기록했습니다. 작성하면서 다른 팀원들 생각도 알 수 있어서 일정을 계획할 때 참고되었습니다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/ab25244a-a4b1-4c47-a9f9-57b1dafe152a/Untitled.png)
    
- **데일리 스크럼** 📄 : 매일 공유할 내용, 전날 작업한 내용을 공유하면서 상호 간 작업 이해도를 높일 수 있었습니다. 높은 이해도를 바탕으로 주별 목표 달성을 위한 세부 계획의 우선순위를 설정해서, 프로젝트가 끝날 때까지 초기의 계획대로 진행할 수 있었습니다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/d1a452d0-7573-4a94-b7fc-2c4333fc4909/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/a8c5c086-0574-4164-b1e8-4f3e4e533218/Untitled.png)
    
- **프-백 콜센터**📄 : 슬랙에서 매일 서로 단체로 채팅을 주고받다 보면 서로 요청했던 세세한 요구사항이 뒤로 밀려 잊히고는 했습니다. 그래서 소통의 창구로 콜센터라는 노션 게시판을 만들어 Jira에 넣기에는 너무 작은 요구사항들을 체크리스트로 만들어 관리했습니다. 😊
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/c08b9b61-1eff-44b0-bb94-5a1e4f66096e/Untitled.png)
    

### Jira

기본적으로 개발 계획에 대한 다양한 view를 제공하고, 현업에서도 자주 쓰이는 툴 사용 방법을 익히고자 Jira로 프로젝트 일정을 관리했습니다. 

- **타임라인** : 이슈들을 한눈에 보고, 에픽을 고려하면서 일정 조율을 했습니다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/4e5cdf16-e9ac-49cc-9410-9111b3621605/Untitled.png)
    
- **스프린트, 백로그** : 매주 월요일 스프린트 회의를 하면서 백로그에서 이번 스프린트에 할 이슈를 선택하고, 개발할  백로그나 보드를 참고해서 개발했습니다.
    
    ![스프린트가 완료되어서 지금은 비어있지만, 스프린트 세션에서 올라온 이슈를 완료 처리 하면서 개발했습니다.](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/bd1465ab-835d-46ca-9755-aa1953bf0cab/Untitled.png)
    
    스프린트가 완료되어서 지금은 비어있지만, 스프린트 세션에서 올라온 이슈를 완료 처리 하면서 개발했습니다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/2a321621-1080-4d07-b9ed-d6cda0575ea6/Untitled.png)
    
- **깃허브와 연동** : 커밋과 PR에 이슈 번호를 적으면 이슈 정보에서 볼 수 있고, 코드 탭에서 머지가 되지 않은 PR을 빠르게 확인할 수 있었습니다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/2c370421-17e8-4734-95ce-36ed53064fdb/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cab981a9-c0dc-43f5-8963-f9cc1120eca8/8d66a071-4d4d-4998-a216-f06dbed35fbf/Untitled.png)
    

[JIRA 컨벤션](https://www.notion.so/JIRA-15eb21e81fbd49c5b7bec1af816ffff5?pvs=21)  [JIRA](https://www.notion.so/JIRA-ec7d64b09b104bdc972a5caa0814c5f4?pvs=21) 

### 페어프로그래밍

백엔드는 2주 차 이후로 코딩 컨벤션 등을 세우고 지키기 위해 오프라인으로 페어프로그래밍을 했습니다. 온라인으로는 `Vscode`의 `live share`을 사용해서 실시간으로 작업을 공유하면서 개발했습니다. 페어 프로그래밍으로 진행을 하니 모르거나 부족한 부분을 서로 보완하고 개발 시각을 넓힐 수 있었습니다. 😊

---

## 더 많이 알고 싶다면?

📌[깃허브 위키](https://github.com/boostcampwm2023/web02-fancamp/wiki)    📌[노션 홈](https://www.notion.so/fancamp-682cf45967304ffb9ff40227b4274e33?pvs=21)
