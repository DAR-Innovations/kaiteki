FROM python:3.11

# Set environment variables
ENV TOKEN 6649168246:AAHbEnhf6jr5io_P5Hq0j2xavHXY7wvMXrY
ENV BASE_URL https://kaiteki.space

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

CMD ["python", "main.py"]
