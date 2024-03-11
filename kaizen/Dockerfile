# Use an official Python runtime as a parent image
FROM python:3.11.0

# Set the working directory in the container
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
RUN python -m nltk.downloader punkt stopwords

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Command to run your application
CMD ["python", "./src/main.py"]
