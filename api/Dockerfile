FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

WORKDIR /apps/api
COPY . .

RUN pip install --upgrade pip
RUN pip install "poetry"

COPY poetry.lock /apps/api/
COPY --chmod=765 start.sh /apps/api/start.sh

RUN poetry config virtualenvs.create true && poetry install --no-interaction --no-ansi
RUN chmod +x /apps/api/start.sh

CMD ["/apps/api/start.sh"]
