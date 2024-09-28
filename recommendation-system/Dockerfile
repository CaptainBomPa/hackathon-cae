FROM python:3.9
WORKDIR /app
COPY src/ .
RUN pip --default-timeout=100 install pandas scikit-learn flask psycopg2-binary
CMD ["python", "main.py"]