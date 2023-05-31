<div align="center">

# Up

![logo](https://github.com/dunggeun/up/assets/26512984/dee084ee-21f7-48b0-b6bb-baeb50e46880)

⭐️ 우리 모두의 성장을 위해, UP

</div>

## 소개

> 모두의 성장을 위해, `업(Up)`!
>
> Up 은 여러분들의 할 일, 목표, 습관으로 만들고 싶은 것 등을 기록하고 이를 꾸준히 수행할 수 있도록 동기부여에 도움을 주는 서비스예요.  
> 업(Up) 챌린지에 도전하고, 나를 키워보아요!

- iOS: [App Store](https://itunes.apple.com/us/app/keynote/id6448998790)
- Android: [Play Store](https://play.google.com/store/apps/details?id=dev.geundung.up)
- Web: [https://up.geundung.dev](https://up.geundung.dev)

---

- 소개 페이지: [https://team.geundung.dev/projects/up](https://team.geundung.dev/projects/up)
- 개인정보 처리방침: [https://team.geundung.dev/privacy](https://team.geundung.dev/privacy)
- 디자인 시스템(Storybook): [https://up-design-system.vercel.app](https://up-design-system.vercel.app)
- Up 개발기 및 회고 ([1편](https://geundung.dev/118), [2편](https://geundung.dev/119), [3편](https://geundung.dev/120))


## 목차

- [기술 스택](#기술-스택)
- [개발 환경 구성](#개발-환경-구성)
- [빌드 및 배포](#빌드-및-배포)
- [라이선스](#라이선스)

## 기술 스택

- Base: [React Native](https://github.com/facebook/react-native)
- UI: [dripsy](https://github.com/nandorojo/dripsy)
- State Management
  - Global State: [XState](https://xstate.js.org)
  - Component Shared State: [Recoil](https://recoiljs.org)
- Data Layer: [React Query](https://github.com/TanStack/query)
- Storage
  - [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
  - Native: SQLite ([react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage))
  - Web: IndexedDB ([bxd](https://github.com/leegeunhyeok/bxd))
- Animations
  - React Native Animated API
  - [Reanimated 3](https://github.com/software-mansion/react-native-reanimated) & [Moti](https://github.com/nandorojo/moti)
- Testing
  - Unit: [Jest](https://github.com/jestjs/jest)
  - E2E: ~~[Detox](https://wix.github.io/Detox)~~

## 개발 환경 구성

```bash
# 의존성 패키지 설치 및 초기 구성
yarn
yarn pod:install
yarn prepare
```

```bash
# Up
yarn start:native
yarn start:web

# Storybook
yarn start:storybook:native
yarn start:storybook:web

# Test & Lint
yarn test
yarn lint

# Build (Debug)
yarn build:android
yarn build:ios

# Build (Production Web)
yarn build:web
yarn build:storybook:web
```

- Up & Storybook 전환 시 이슈가 있을 경우 `--reset-cache` 플래그 추가

## 빌드 및 배포

```bash
# 버전 태그 및 브랜치 생성
yarn release

# Alpha 트랙 업로드
fastlane android alpha

# Test Flight 업로드
fastlane ios beta
```

### Android

- `~/.gradle/gradle.properties` ([참고](https://reactnative.dev/docs/signed-apk-android))
  ```
  UP_UPLOAD_STORE_FILE=name.keystore
  UP_UPLOAD_KEY_ALIAS=key-alias
  UP_UPLOAD_STORE_PASSWORD=                   
  UP_UPLOAD_KEY_PASSWORD=
  ```

### Fastlane

- `fastlane/*.p8`: AppStore Connect API Key 파일 배치
- `fastlane/.env.default` 파일 생성 및 값 추가
  ```
  # Fastlane match git 저장소
  MATCH_REPOSITORY="git@github.com:user/repository.git"

  # AppStore Connect 관련 구성
  APPLE_ID=""
  APPLE_TEAM_ID=""
  APPSTORE_CONNECT_ISUSER_ID=""
  APPSTORE_CONNECT_API_KEY_ID=""
  APPSTORE_CONNECT_API_KEYFILE_PATH=""

  # 애플 앱 API 키
  FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=""  
  ```
- iOS Provisioning profile 환경 구성
  ```bash
  fastlane match development
  fastlane match adhoc
  fastlane match appstore
  ```

### Sentry

- `.env` 파일 생성 및 값 추가
  ```
  WEB_SENTRY_DSN=
  REACT_NATIVE_SENTRY_DSN=
  ```
- `android/sentry.properties`, `ios/sentry.properties` 파일 생성 및 값 추가
  ```
  defaults.url=https://sentry.io
  defaults.org=
  defaults.project=
  auth.token=
  cli.executable=../node_modules/@sentry/cli/bin/sentry-cli
  ```

## 라이선스

애플리케이션 내에 존재하는 모든 리소스(이미지, 아이콘 등)의 저작권은 [둥근](https://github.com/dunggeun) 팀에게 있습니다.

- [MIT](LICENSE)
