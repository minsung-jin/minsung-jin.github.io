# Setup

아래 명령어로 vim 설치.
```
$ sudo apt install vim
```

Vundle 플러스인 설치.
```
$ mkdir ~/.vim/bundle -p
$ cd ~/.vim/bundle
$ git clone https://github.com/VundleVim/Vundle.vim
```

vim-lsp 설치.
```
$ mv ~/Download/vimrc2_lsp ~/.vimrc
```

codedark 테마 설치
```
$ mkdir ~/.vim/colors -p
$ mv ~/Download/codedark.vim ~/.vim/colors
```

.vimrc 파일을 열고 아래 명령어로 플러그인 설치
```
$ vim .vimrc
```

`:BundleInstall`

자동완성을 위해서 clangd 설치
```
$ sudo apt install clangd-15
```

