ARG APP_VERSION

FROM python:${APP_VERSION}

COPY ./myapp /myapp

WORKDIR /myapp

RUN pip install -r requirements.txt

CMD ["flask", "run"]