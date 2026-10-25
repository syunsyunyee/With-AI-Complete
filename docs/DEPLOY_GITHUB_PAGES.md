# 본인 GitHub 계정으로 사이트 배포하기

이 통합본은 특정 계정에 연결되어 있지 않습니다. 아래 과정에서 **사이트를 소유할 본인 계정**으로 GitHub에 로그인하세요. 다른 사람의 저장소 설정을 바꿀 필요가 없습니다.

## 1. 새 저장소 만들기

1. https://github.com/new 를 엽니다.
2. **Owner**가 본인 계정인지 확인합니다.
3. Repository name에 원하는 이름을 입력합니다. 예: `With-AI-Complete` 또는 `aigo-in`.
4. **Public**을 선택하고 저장소를 만듭니다. 공개해도 되는 프로젝트 파일만 올리세요.

## 2. 통합본 업로드하기

1. 받은 ZIP을 **모두 압축 풀기** 합니다.
2. 새 저장소에서 **uploading an existing file** 또는 **Add file → Upload files**를 누릅니다.
3. 압축을 푼 `with-ai-complete-portable` 폴더 **안의 파일과 하위 폴더**를 올립니다.
   ZIP 자체나 바깥 폴더를 한 단계 더 감싸서 올리면 안 됩니다.
4. 파일이 많으면 한 번에 100개 미만씩 나누어 올립니다. 먼저 루트 파일, 다음 `docs`, `web`, 나머지 폴더 순으로 여러 번 업로드하고 매번 **Commit changes**를 누르면 됩니다.
5. 이 안내는 기본 브랜치가 `main`인 새 저장소를 기준으로 합니다. 이름이 다르면 아래 Pages 설정에서 실제 기본 브랜치를 선택하세요.

저장소 첫 화면에서 아래 구조가 보여야 합니다.

```text
README.md
DEPLOY_GITHUB_PAGES.md
IN_Install.cmd
IN_Install.ps1
IN_Launch.ps1
IN_Start.html
in_bridge.py
web_kiosk.py
docs/
  index.html
  launch-menu.js
  readable.css
  assets/
  program/unified.hex
web/
models/
microbit/
... 나머지 Python 파일과 폴더
```

`docs` 폴더에는 배포할 HTML·CSS·JavaScript·이미지·펌웨어가 모두 들어 있습니다.
장치 연결 도우미를 쓰려면 `docs`만 올리지 말고 프로젝트 전체를 올리세요.
사용 중 생성된 `.venv`, `work`, `in-helper.local.json`, 개인 사용 기록은 올리지 마세요.

## 3. 본인 저장소에서 GitHub Pages 켜기

1. **본인 계정 / 새 저장소**의 **Settings → Pages**로 이동합니다.
2. **Build and deployment → Source**를 **Deploy from a branch**로 선택합니다.
3. **Branch**: `main`, 폴더: **`/docs`**를 선택합니다.
4. **Save**를 누릅니다.
5. **Actions**에서 `pages build and deployment`가 완료되기를 기다립니다.
6. **Settings → Pages → Visit site**를 누릅니다.

설정 주소 형식: `https://github.com/내아이디/내저장소이름/settings/pages`

**공유할 사이트 주소는 `https://내아이디.github.io/내저장소이름/`입니다.**
GitHub의 `blob/.../index.html` 주소나 ZIP 다운로드 주소는 사이트 주소가 아닙니다.
예를 들어 저장소 이름이 `aigo-in`이면 `https://내아이디.github.io/aigo-in/`을 공유하세요.
본인 계정 이름과 동일한 `내아이디.github.io` 저장소를 만든 경우 주소는 `https://내아이디.github.io/`입니다.

## 4. 장치가 연결된 Windows PC에서 최초 설치

GitHub Pages는 웹 시작 화면과 다운로드 파일을 배포합니다. 키오스크·복약 알림 등 실제 서비스와 USB 장치 제어는 Windows의 로컬 Python 연결 도우미에서 실행됩니다.

1. Python 3.13과 `py` 실행기를 설치합니다.
2. 프로젝트 전체 ZIP을 압축 푼 상태에서 **`IN_Install.cmd`**를 한 번 실행합니다.
3. 본인 계정의 Pages 사이트를 엽니다.
4. 기능 버튼을 누르고 브라우저의 연결 도우미 실행 요청을 허용합니다.
5. 열린 로컬 화면에서 로보독과 micro:bit의 실제 COM 포트를 선택합니다.

PC를 바꾸거나 설치 폴더를 옮겼다면 그 PC 또는 새 폴더에서 `IN_Install.cmd`를 다시 실행하세요.
`.ps1`의 마지막 글자는 영문 l이 아니라 숫자 **1**입니다. CMD와 PS1을 같은 폴더에 두세요.

## 다시 업데이트할 때

- 변경한 파일을 같은 본인 저장소의 동일 경로에 업로드하고 커밋하면 Pages가 다시 배포됩니다.
- Pages 화면은 `docs/index.html`, `docs/launch-menu.js` 등 `docs/`의 파일입니다.
- PC의 Python/HTML도 바꿨다면 로컬 설치 폴더의 파일도 업데이트하고 연결 도우미를 다시 시작하세요.
- 펌웨어를 바꾸면 `models/unified.hex`와 `docs/program/unified.hex`를 함께 업데이트하세요.

## 문제 해결

- 404: Settings → Pages에서 배포 성공 여부와 `main /docs` 설정을 확인합니다.
- README만 보임: 폴더가 `/ (root)`가 아닌 **`/docs`**인지 확인합니다.
- `/docs` 선택이 없음: 저장소 첫 화면에 `docs`가 있는지 확인합니다. 바깥 폴더 안에 넣었다면 루트로 올리세요.
- 설치 파일이 없음: ZIP 안에서 직접 실행하지 말고 전체를 압축 푸세요.
- 다른 계정으로 다운로드됨: 새로 포함한 `docs/launch-menu.js`와 `docs/index.html`을 함께 올렸는지 확인합니다.
- 기존 캐시가 보임: 배포가 끝난 뒤 Ctrl+F5로 새로고침합니다.

이 통합본의 프로젝트 다운로드 링크는 현재 열린 `github.io` 사이트의 계정과 저장소를 자동으로 사용합니다. 로컬 파일로 열면 이 안내가 표시됩니다. 별도 도메인은 이 자동 판별 대상에 포함하지 않습니다.

공식 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
