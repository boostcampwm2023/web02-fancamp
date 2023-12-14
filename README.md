# ![title](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/5f3d3cab-f39a-496b-bfc0-22ea663e2796) fancamp

> **인플루언서와 팬이 소통하는 커뮤니티**
>

## 프로젝트 소개

```
인플루언서와 실시간으로 소통을 해보세요!
인플루언서라면 팬들과 일상을 공유하며 친밀감을 올릴 수 있어요. 😊
```

### 주제 선정 이유

```
SNS 서비스에 공통적으로 있는 포스트, 피드, 실시간 채팅, 검색 기능은
웹 서비스에서 흔히 사용되어 이번 기회에 학습하고 구현해보면 추후에 도움이
될 것 같아 이 주제를 선택하게 되었어요. 😎
```

## 기능 소개

### 주요 기능

1. 포스트 및 코멘트 실시간 업데이트

    <img src="https://github.com/boostcampwm2023/web02-fancamp/assets/99123542/f6cd7a23-f454-4d93-ad89-788dc90deec9" width="60%" />

    <img src="https://github.com/boostcampwm2023/web02-fancamp/assets/99123542/44a35c98-f860-476e-a9e1-a0cfda66ee88" width="60%" />

    
2. 피드

    <img src="https://github.com/boostcampwm2023/web02-fancamp/assets/99123542/b5fb634a-8434-4760-b41e-658ddbfaf38a" width="30%" />
    
3. 채팅

    ![채팅](https://github.com/boostcampwm2023/web02-fancamp/assets/54917836/f6f36eec-c795-4f5e-b318-48bd8709b041)

📢 더 자세히 확인해보세요 → [여기](https://github.com/boostcampwm2023/web02-fancamp/wiki/%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C)로!

---

## 기술  소개

📢 자세한 내용은 [여기](https://github.com/boostcampwm2023/web02-fancamp/wiki/%EA%B8%B0%EC%88%A0-%EC%84%A0%EC%A0%95-%EC%9D%B4%EC%9C%A0)를 봐주세요

### React

선언적으로 뷰 표현 가능. 뷰를 컴포넌트 단위로 관리.

### Tailwind CSS

직관적인 CSS 프로퍼티 사용. CSS 클래스 네임 고려 불필요. 

### TanStack Query

`비동기 상태 관리` 라이브러리로써 비동기 상태 관리의 복잡성 낮춤. 

### Nest.js

정해진 구조, 데코레이터로 효율적으로 개발.

### MySQL

데이터가 대부분 연관, 자주 변경 일어나서 RDBMS 사용.

### Socket.IO

`namespace`와 `room` 기능을 이용한 빠르게 개발.

### PM2, Prometheus, Grafana

`PM2`: 프로세스 종료 시 재시작, 로그, cluster

`Grafana`: 모니터링을 위한 시각화

`Prometheus`: 서버, 노드 어플리케이션 별 metric 수집.

---

## 기술적 고민

### 프론트엔드

**재사용성을 생각한 컴포넌트 설계**

코드의 중복을 막기 위해 함수로 분리하는 것처럼, 요소의 중복 또한 컴포넌트로 분리해야 된다고 생각합니다. 그리고 컴포넌트로 분리할 때 가장 중요한 점은 그 컴포넌트의 목적을 명확하게 하고, 다양한 상황에 사용할 수 있도록 만드는 것이라고 생각했습니다.

[🎨[FE] ****공통 컴포넌트 만들기****](https://www.notion.so/FE-e641dd4dbf754288a6fb74f1d55c647d?pvs=21)

**무한 스크롤 및 무한 슬라이더**

무한 스크롤과 무한 슬라이더를 만들면서, 동시에 확장성과 최적화를 고민했습니다. 재사용을 위해 필요한 로직을 커스텀 훅으로 분리하고, 최적화를 위해 컴포넌트의 구조와 동작 자체를 다시 설계하는 등 많은 기술적 고민을 했습니다.

[🎨[FE] 유튜브 쇼츠 같은 컴포넌트 만들기](https://www.notion.so/FE-2fbc3d8c47b942078eb8890d46505aba?pvs=21)

**그 외 고민들**

[🎨[FE] 이미지 최적화](https://coli-pasta.notion.site/FE-1acc599950f74bdabef14b3e60bba3f2?pvs=4)

[🎨[FE] 무한 스크롤](https://coli-pasta.notion.site/FE-3-3-3ac8b2d1dbe347acbc418b1c6ad1e159?pvs=4)

[🎨[FE] Socket.IO를 이용한 채팅 초기 구현](https://coli-pasta.notion.site/FE-1-3-socket-IO-6255be3d6ace409289f3febc88803307?pvs=4)

[🎨[FE] 유저 Context 구현기 1/2](https://coli-pasta.notion.site/FE-1-2-AuthContext-bde97edd23de47389ef0c2e67dcb1c7f?pvs=4)

[🎨[FE] 유저 Context 구현기 2/2](https://coli-pasta.notion.site/FE-2-2-AuthContext-891957ceb4f44a8da522a7045fd3aa80?pvs=4)

### 백엔드

**모니터링**

테스트가 처음이라서 최적화할 지표를 찾는 것이 고민이었습니다. 그래서 실시간으로 변하는 그래프를 보면 빠르게 찾을 것 같아서 Grafana와 Prometheus를 도입했습니다. Prometheus 서버와 exporter 등의 개념을 이해하고 적용했고, 테스트를 하면서 CPU 사용률과 이벤트 루프 시간을 개선하기로 결정했습니다.

[📊성능 테스트 part 1](https://www.notion.so/part-1-e29517c82db1495385200f872fc07b81?pvs=21) [📊성능 테스트 part 2](https://www.notion.so/part-2-ef7cddcf49da4ee99f3a5eb0f23097de?pvs=21) 

**채팅과 알림**

채팅뿐만 아니라 포스트와 댓글 업데이트를 소켓으로 새로고침 없이 자동 업데이트하기 위해 `chat`, `post`, `page`, `notice` 4개의 `namespace`와 각 요소 `ID`를 `room`으로 하여 관리하였습니다.  

처음에는 단순 DB 저장만 있던 과정이 API와 알림, 소켓을 통한 update 등 과정이 복잡해지면서 이해를 위해 정리하고, 그림을 그렸습니다.

<details>
<summary>댓글, 포스트 생성 Flow</summary>

 ![사용자가 댓글 작성 → `Clova Sentiment`로 감정 분석 후 색깔 생성 → `DB`에 저장 → `socket` 해당 페이지에 있는 사람들에게 `Comment Update`](https://github.com/boostcampwm2023/web02-fancamp/assets/58136348/d856843a-10ea-48ec-8809-5f6b9a55c2c6)
    사용자가 댓글 작성 → `Clova Sentiment`로 감정 분석 후 색깔 생성 → `DB`에 저장 → `socket` 해당 페이지에 있는 사람들에게 `Comment Update`

![포스트](https://github.com/boostcampwm2023/web02-fancamp/assets/58136348/760d9c2a-ab03-4ea3-8c2e-cfb28d2bdc70)
    사용자가 포스트 작성 → `PaPago`로 번역, `ncloud storge`에 업로드 → `DB`에 저장 → `socket` 해당 페이지에 있는 사람들에게 `Post emit`, 구독 중인 사용자에게 `Notice emit`

</details>
    
📄[채팅 상세기능 정하기 - 소켓 정리](https://www.notion.so/df6147a7c2f844f095ef643b1e7abd8e?pvs=21) 

**DB 성능 측정**

`NoSQL`인 `MongoDB`를 그나마 관계가 떨어져 있는 `채팅 DB`에만 적용해 봤는데, `MySQL`과 읽기와 쓰기 성능 차이가 별로 없었습니다. 

🆚[MySQL과 MongoDB 성능 측정하기](https://www.notion.so/MySQL-MongoDB-e260366224174463a6f303207aa98674?pvs=21) 

---

## 원활한 협업을 위한 노력들

### Notion

프로젝트를 나중에 더 잘 기억하고, 협업 시 발생한 어려움을 해결하기 위해 특별히 신경 쓴 페이지들이 있습니다. 
<details>
<summary>데일리 회고📄 : 매주 KPT 방법으로 회고하는 것과 별개로, 매일 일기장처럼 개발하면서 느낀 점을 기록했습니다. 작성하면서 다른 팀원들 생각도 알 수 있어서 일정을 계획할 때 참고되었습니다.</summary>
    
![데일리 회고](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/477962ad-8507-4eb7-bcc2-445b71b66d0b)

</details>

<details>
<summary>데일리 스크럼📄 : 매일 공유할 내용, 전날 작업한 내용을 공유하면서 상호 간 작업 이해도를 높일 수 있었습니다. 높은 이해도를 바탕으로 주별 목표 달성을 위한 세부 계획의 우선순위를 설정해서, 프로젝트가 끝날 때까지 초기의 계획대로 진행할 수 있었습니다.</summary>

![데일리 스크럼](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/bffc0549-c44d-43cf-96de-3df6ac6d4465)

![데일리 스크럼 2](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/db28e2e0-4a6e-445d-9ed7-d50187a19063)

</details>

<details>
<summary>프-백 콜센터📄 : 슬랙에서 매일 서로 단체로 채팅을 주고받다 보면 서로 요청했던 세세한 요구사항이 뒤로 밀려 잊히고는 했습니다. 그래서 소통의 창구로 콜센터라는 노션 게시판을 만들어 Jira에 넣기에는 너무 작은 요구사항들을 체크리스트로 만들어 관리했습니다. 😊</summary>

<img width="1310" alt="프벡" src="https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/fa6144a5-cc88-41d0-84a8-ff7c98f7f6d6">

</details>

### Jira

기본적으로 개발 계획에 대한 다양한 view를 제공하고, 현업에서도 자주 쓰이는 툴 사용 방법을 익히고자 Jira로 프로젝트 일정을 관리했습니다. 

<details>
<summary>타임라인 : 이슈들을 한눈에 보고, 에픽을 고려하면서 일정 조율을 했습니다.</summary>

![탐라](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/b8f27e5c-3064-48d2-9051-bb3037bbe829)

</details>

<details>
<summary>스프린트, 백로그 : 매주 월요일 스프린트 회의를 하면서 백로그에서 이번 스프린트에 할 이슈를 선택하고, 개발할 이슈만 있는 백로그나 보드를 참고해서 개발했습니다.</summary>

![백로](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/5423ac12-9e48-4ee6-8ce5-1e38e8d16e56)
스프린트가 완료되어서 지금은 비어있지만, 스프린트 세션에서 올라온 이슈를 완료 처리 하면서 개발했습니다.
![차트](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/a0593c14-c177-41fe-9462-785cd53ae239)
</details>
    
<details>
<summary>깃허브와 연동 : 커밋과 PR에 이슈 번호를 적으면 이슈 정보에서 볼 수 있고, 코드 탭에서 머지가 되지 않은 PR을 빠르게 확인할 수 있었습니다.</summary>

![PR](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/76c0f4dd-ddd1-45fd-83a8-c07be059b428)

![pr 연동](https://github.com/boostcampwm2023/web02-fancamp/assets/101859033/8cd23525-1f57-45c5-9b92-aa424c52fc56)

</details>  

📌[지라 컨벤션 위키](https://github.com/boostcampwm2023/web02-fancamp/wiki/JIRA-%EC%BB%A8%EB%B2%A4%EC%85%98)    📌[지라 위키](https://github.com/boostcampwm2023/web02-fancamp/wiki/JIRA)

### 페어프로그래밍

백엔드는 2주 차 이후로 코딩 컨벤션 등을 세우고 지키기 위해 오프라인으로 페어프로그래밍을 했습니다. 온라인으로는 `Vscode`의 `live share`을 사용해서 실시간으로 작업을 공유하면서 개발했습니다. 페어 프로그래밍으로 진행을 하니 모르거나 부족한 부분을 서로 보완하고 개발 시각을 넓힐 수 있었습니다. 😊

---

## 더 자세한 정보

📌[깃허브 위키](https://github.com/boostcampwm2023/web02-fancamp/wiki)    📌[노션 홈](https://www.notion.so/fancamp-682cf45967304ffb9ff40227b4274e33?pvs=21)
