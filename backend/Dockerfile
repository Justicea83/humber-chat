FROM python:3
LABEL maintainer="justicea83"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./app /app

WORKDIR /app
EXPOSE 8000

ARG DEV=false
ENV DEV=$DEV

RUN python -m venv /py && \
    . /py/bin/activate && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ $DEV = "true" ]; \
      then /py/bin/pip install -r /tmp/requirements.dev.txt ; \
    fi

ENV PATH="/py/bin:$PATH"
ENV PYTHONPATH "${PYTHONPATH}:/app"

RUN mkdir -p /app/staticfiles
RUN mkdir -p /app/static

RUN chmod 777 /app/static
RUN chmod 777 /app/staticfiles