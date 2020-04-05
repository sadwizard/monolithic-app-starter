# app starter

- client (webpack, react/redux, sass)
- backend (nodejs/express, mysql, myadmin)
- services
  -- cron
  -- nginx - в production сборке клиент раздается сервером nginx

###Cборка
- ./start.sh (для развертывания production сборки измените переменную окружения NODE_ENV в файле variables.env)

###Доступ к контейнеру
- $ docker exec -i -t ${name_app} /bin/bash
