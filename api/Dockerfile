FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
ENV POETRY_VIRTUALENVS_CREATE 0

WORKDIR /app/api
COPY . .

COPY poetry.lock /app/api
COPY --chmod=765 scripts/run.sh /app/run.sh

RUN pip install "poetry"
RUN /bin/true\
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction \
    && rm -rf /root/.cache/pypoetry
RUN chmod +x /app/run.sh

RUN groupadd -r app && useradd -r -g app appuser \
    && chown -R appuser:app /app \
    && chmod +x /app/run.sh

USER appuser

CMD ["/app/run.sh"]