#Build
FROM python:latest

RUN apt-get update && apt-get -y install cron vim
WORKDIR /scripts
COPY crontab /etc/cron.d/crontab
COPY . .

CMD ["cron", "-f"]