# Use an official Python runtime as a parent image
FROM python:3.11.0

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY ./requirements/requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install huggingface model
RUN python -c "from transformers import AutoModelForCausalLM, AutoTokenizer; model_name = 'TinyLlama/TinyLlama-1.1B-Chat-v1.0'; AutoTokenizer.from_pretrained(model_name); AutoModelForCausalLM.from_pretrained(model_name)"

# Install NLTK data
RUN python -m nltk.downloader punkt stopwords

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable for FastAPI to run on 0.0.0.0
ENV HOST=0.0.0.0

# Command to run your application
CMD ["python", "./src/main.py"]
