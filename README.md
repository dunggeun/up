<div align="center">

# Up

⭐️ 우리 모두의 성장을 위해, UP

</div>

## 목차

- wip

## 구성

### Android

- `~/.gradle/gradle.properties` ([참고](https://reactnative.dev/docs/signed-apk-android))
  ```
  UP_UPLOAD_STORE_FILE=name.keystore
  UP_UPLOAD_KEY_ALIAS=key-alias
  UP_UPLOAD_STORE_PASSWORD=                   
  UP_UPLOAD_KEY_PASSWORD=
  ```

### Fastlane

- `fastlane/*.p8`
  - AppStore Connect API Key 파일 배치
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
