# 기여하는 방법

## 이슈

[이 곳](https://github.com/kangju2000/gachon-tools/issues)에서 이슈를 확인하고, 만약 없다면 새로운 이슈를 생성해주세요.

## Pull Request

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)에 맞춰 커밋 메시지를 작성해주세요.

## 실행 방법

### 파이어폭스 확장 프로그램 실행

1. `npx pnpm install`로 의존성을 설치합니다.
2. `npx pnpm run dev:firefox` 명령어로 개발 서버를 실행합니다. Hot reload를 위해 켜두어야 합니다.
3. 파이어폭스 주소창에 `about:debugging`을 입력하여 접속합니다.
4. 좌측 메뉴에서 '이 Firefox'를 클릭합니다.
5. '임시 부가 기능 로드...' 버튼을 클릭하고, 프로젝트 루트의 `dist` 폴더 안에 있는 `manifest.json` 파일을 선택합니다.
