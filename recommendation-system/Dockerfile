FROM python:3.9
WORKDIR /app
COPY src/ .
RUN --mount=type=cache,target=/cache pip --default-timeout=100 install --cache-dir /cache pandas scikit-learn flask psycopg2-binary
CMD ["python", "main.py"]