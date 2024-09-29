FROM python:3.9
WORKDIR /app
RUN --mount=type=cache,target=/cache pip --default-timeout=100 install --cache-dir /cache pandas scikit-learn flask psycopg2-binary flask-cors
COPY src/ .
CMD ["python", "main.py"]