#!/bin/bash
mysql -h centerbeam.proxy.rlwy.net -u root -p"CLGcehULcdAVWeRwCGyvuizCqKYmMQKv" --port 11048 --protocol=TCP railway < "./src/backend/infrastructure/db/initialDDL.sql"