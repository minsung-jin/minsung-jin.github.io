---
layout: post
title: Jekyll install
---

# Jekyll 이란?


Jekyll은 아주 심플하고 블로그 지향적인 정적 사이트 생성기입니다.
Jekyll은 다양한 포맷의 원본 텍스트 파일을 템플릿 디렉토리로부터 읽어서, 
(markdown등의) 변환기와 Liquid 렌더러를 통해 가공하여,
당신이 즐겨 사용하는 웹서버에 곧바로 게시할 수 있는, 완성된 정적 웹사이트를 만들어냅니다.
그리고 Jekyll은 Github Pages의 내부 엔진이기도 합니다. 
다시말해, Jekyll을 사용하면 자신의 프로젝트 페이지나 블로그, 웹사이트를 무료로 Github에 호스팅 할수 있다는 뜻입니다.

## 설치

---

### 준비물

* Ruby
* RubyGems
* NodeJS, 또는 다른 javascript 실행환경
	* Jekyll 2와 그 이전버전에서, CoffeeScript 지원에 필요함
* Python 2.7
	* Jekyll 2나 그 이전버전의 경우

## Ruby 설치

---

### Windows 환경에서 Ruby를 설치하는 방법

* Ruby 설치를 위한 Windows binary는 아래 주소에서 다운로드 가능
	* <http://rubyinstaller.org/downloads>
	* Windows 환경에서는 32비트 설치를 권장한다.
	* 설치경로는 원하는 위치로 지정
	```
	C:\workspace\ruby\ruby23
	```
* 설치중 아래 항목에 체크하여 __PATH__ 환경변수에 등록
	```
	Add Ruby executables to your PATH
	```
* 컴파일 환경을 갖추기 위해 각자 버전에 맞는 DEVELOPMENT KIT 도 설치
	```
	DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe
	```
	* 설치경로는 원하는 위치로 지정
	```
	C:\workspace\ruby\RubyDevKit
	```
	* RubyDevKit 디렉토리로 이동하여 아래 명령어를 실행하여 설치를 완료
	```
	ruby dk.rb init
	ruby dk.rb install
	```
* Ruby 버전확인
	```
	ruby -v
	```

## Jekyll 설치

---

###  CLI를 이용하여 Jekyll 설치

* jekyll install
	```
	gem install jekyll
	```
	* 프록시사용의 경우에는 아래와 같이 옵션 추가
	```
	gem install --http-proxy http://~~~:8080 jekyll
	```
* bundler install
	```
	gem install bundler
	```

### Jekyll 로 지역저장소 만들기

* 지역저장소를 만들기 위한 위치로 이동하여 아래 명령어 실행
	```
	jekyll new githubPages
	jekyll serve --watch
	```

## github pages 에 블로그 운영하기

--- 

### github 에 pages 원격 저장소 만들기

* github 사이트로 이동
* create a repository 메뉴로 원격저장소를 만든다
* 이름은 아래와 같이 형식을 맞춰야 한다.
	```
	username.github.io
	```

### git 으로 원격저장소 등록하기

* Jekyll 지역저장소로 이동하여 git 저장소 생성
	```
	git init
	```
* 원격저장소를 origin 이라는 이름으로 등록하기
	```
	git remote add origin remote-repository-url
	```
	* 위에서 remote-repository-url 은 보통 아래와 같은 주소가 되는데 github pages 에서 확인 가능
	```
	https://github.com/username/username.github.io.git
	```

### github pages 에 업데이트

* 블로그 변동사항을 지역저장소에 저장하기
	```
	git add --all
	git commit -m "message"
	```
* 지역저장소의 내용을 원격 저장소로 push 하여 블로그 업데이트 하기
	```
	git push origin master
	```

### 참고사이트

* <http://rubyinstaller.org/downloads/>
* <http://jekyllrb-ko.github.io/docs/installation/>
* <https://xho95.github.io/blog/github/jekyll/git/2016/01/11/Make-a-blog-with-Jekyll.html>
