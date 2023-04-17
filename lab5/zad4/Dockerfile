FROM alpine

ARG PYTHON_VERSION

RUN apk add --update --no-cache python$PYTHON_VERSION && ln -sf python3 /usr/bin/python

ARG PORT

RUN python3 -m ensurepip

RUN pip3 install --no-cache --upgrade pip setuptools

ENV APP_PORT=$PORT

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["python3", "app.py"]