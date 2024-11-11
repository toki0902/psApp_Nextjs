# 1. ベースイメージとしてNode.jsを使用
FROM node:latest

# 2. 作業ディレクトリを設定
WORKDIR /usr/src/app

# 3. パッケージファイルをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# 4. アプリケーションファイルをコピー
COPY . .

# 6. Next.jsサーバーを起動
CMD ["npm", "run", "dev"]

# 7. ホストのポート3000をコンテナに公開
EXPOSE 3000
