FROM python:3-alpine

# to prevent the PID1 zombie reaping problem
RUN apk add --no-cache tini

WORKDIR /scripts
COPY crontab requirements.txt src/*.py ./

RUN pip3 install -r requirements.txt

# setup cron job
# note: default timezone for containers is UTC (which is what we want)
RUN crontab ./crontab

ENV LOLPRODLE_CTX_DIR="${LOLPRODLE_CTX_DIR}"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["crond", "-f"]
