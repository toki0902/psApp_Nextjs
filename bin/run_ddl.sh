#!/bin/bash

# .env読みこみ
source .env

# 環境変数使用
echo "Using MySQL root password: $MYSQL_ROOT_PASSWORD"

# sql実行
docker exec -i psapp_nextjs-db-1 mysql -u root -p"$MYSQL_ROOT_PASSWORD" < "./src/infrastructure/db/initialDDL.sql"