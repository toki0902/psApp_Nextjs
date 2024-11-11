
#!/bin/bash
echo "connect MySQL!!"

# .env読みこみ
source .env

# 環境変数使用
echo "Using MySQL root password: $MYSQL_ROOT_PASSWORD"

# 実行
docker exec -it psapp_nextjs-mysql-1 mysql -h mysql -u root -p"$MYSQL_ROOT_PASSWORD" ps-app