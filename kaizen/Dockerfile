FROM python:3.11.0

WORKDIR /app

# Copy the requirements file into the container at /app
COPY ./requirements/requirements.txt /app/requirements/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements/requirements.txt

# Copy the requirements file into the container at /app
COPY ./setup/models_setup.py /app/setup/models_setup.py

# Install huggingface model
RUN python setup/models_setup.py

# Install NLTK data
RUN python -m nltk.downloader punkt stopwords wordnet averaged_perceptron_tagger

# Copy the current directory contents into the container at /app
COPY . /app

EXPOSE 8000

CMD ["python", "./src/main.py"]
