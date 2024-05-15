# BeeSpace

![BS_Logo500x181](https://github.com/CreaviSpace/BeeSpace-FrontEnd/assets/97121074/27534123-e13a-4cc3-a9d6-de4ab5407cf6)

# BeeSpace

"개발자들을 위한 협업과 성장의 장, 비스페이스(BeeSpace)!

비스페이스는 프로젝트 공유, 팀원 모집, 다양한 기술 커뮤니티 및 피드백 기능을 제공하는 통합 개발자 커뮤니티 사이트입니다. 자신의 프로젝트를 소개하고, 협업의 기회를 찾을 수 있는 기회의 공간을 제공합니다.

## 배포 기간

배포 기간: 2024-01 ~ 2024-05

## 배포 주소

vercel: [BeeSpace](https://creavispace.vercel.app/)

## 프로젝트 소개

비스페이스는 프로젝트 공유, 팀원 모집, 다양한 기술 커뮤니티 및 피드백 기능을 제공하는 개발자 커뮤니티 사이트입니다. 개발자들이 열정을 담아 만든 프로젝트를 소개하고, 협업 기회를 찾을 수 있는 공간을 제공합니다.

프로젝트 페이지를 통해 서로 프로젝트를 공유하고, 피드백을 주고 받으며 영감을 얻을 수 있습니다. 모집 페이지에서는 팀 프로젝트에 참여하거나 협력할 팀원을 찾을 수 있습니다. 커뮤니티 페이지에서는 여러 기술 스택과 그 이외의 고민에 대해 공유하고, 새로운 아이디어와 해결책을 찾을 수 있습니다.

더불어, 개발자들이 서로의 작업물에 대한 솔직한 피드백을 주고받을 수 있는 피드백 기능을 강화하고 있습니다. 이를 통해 실력 향상과 성장을 위한 소중한 장소로 사용할 수 있습니다.

## 멤버

| FE | FE |
| :---: | :---: |
| <a href="https://github.com/springhana"><img src="https://avatars.githubusercontent.com/u/97121074?v=4" alt="profile" width="140" height="140"></a> | <a href="https://github.com/pionoiq"><img src="https://avatars.githubusercontent.com/u/101159509?v=4" alt="profile" width="140" height="140"></a> |
| [김성환](https://github.com/springhana) | [장다은](https://github.com/pionoiq) |

| BE | BE |
| :---: | :---: |
| <a href="https://github.com/YuHoSeong"><img src="https://avatars.githubusercontent.com/u/82141580?v=4" alt="profile" width="140" height="140"></a> | <a href="https://github.com/K-KY"><img src="https://avatars.githubusercontent.com/u/66647057?s=96&v=4" alt="profile" width="140" height="140"></a> |
| [유호성](https://github.com/YuHoSeong) | [김규영](https://github.com/K-KY) | 

---

# 시작 가이드

## 요구 사항

- Node : 20
- pnpm : 8.14-

## 설치

```bash
$ git clone https://github.com/CreaviSpace/BeeSpace-FrontEnd.git
$ cd BeeSpace-FrontEnd
$ pnpm install
$ pnpm dev
```

## 기술 스택

<div>
  <p><strong>FrontEnd</strong></p>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/zustand-764ABC?style=for-the-badge&logo=zustand&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=redux&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/chakra ui-319795?style=for-the-badge&logo=chakra ui&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>&nbsp 
</div>


<div>
  <p><strong>BackEnd</strong></p>
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>&nbsp 
</div>

---

# 화면 구성

## 화면 (이미지 클릭시 이동)

홈, 프로젝트, 모집, 커뮤니티, 각 디테일들, 각 글쓰기, 피드백, 검색, 프로필, 프로필 수정, 관리자

## 주요 기능

⭐ 무한 스크롤

- 페이지 이동 없이 **새로운 콘텐츠를 끊임없이** 로드합니다.
- 모바일 환경을 고려하여 콘텐츠만 미리 로딩되어 **초기 로딩 속도를 향상**시켰습니다.

⭐ 소셜 로그인

- 소셜 미디어 플랫폼이 제공하는 인증 시스템을 활용 **안정성 향상**과 새로운 계정을 생성하고 로그인하는 **번거로움을 감소**시켰습니다.

⭐ 최적화

- **이미지 포맷 Avif**를 사용하여 기존의 png, jpg 보다 적은 용량으로 **네트워크 성능을 최적화**했습니다.
- `browser-image-compression` 라이브러리 사용으로 **이미지를 압축**해서 AWS S3에 배포하여 **이미지 용량을 최소화**하였습니다.

⭐ 캐시 관리

- `React Query`를 사용해 API 요청 결과를 자동으로 캐싱하여 **네트워크 트래픽을 줄이고 애플리케이션 기능을 향상**시켰습니다.

⭐ 사용자 UI & UX

- 첫 로딩 시 서버 사이드 렌더링(SSR)의 페이지 로딩 속도에 맞게 **로딩 페이지 제공**해 주고 있습니다.
- 스켈레톤 UI를 적용하여 데이터 로딩 중에도 **UI의 일관성을 유지**하고, **사용자의 관심을 유지**시킵니다.

⭐ 배포 CI/CD

- 팀 리포지토리의 main 브런치에 push 상태가 일어나면 개인 리포지토리의 main 브런치로 push 후 vercel에 배포됩니다.

---

# 기타
