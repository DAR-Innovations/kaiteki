# Chatbot API

A simple Flask API for interacting with a conversational AI model. This API allows you to perform various natural language processing tasks, such as chat-based responses, text summarization, keyword extraction, and paraphrasing.

## Table of Contents
- [Introduction](#introduction)
- [Endpoints](#endpoints)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Examples](#examples)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This API utilizes the Hugging Face Transformers library and provides endpoints for different natural language processing tasks using a pre-trained model. The supported tasks include chat-based responses, text summarization, keyword extraction, and paraphrasing.

## Endpoints

1. **Chat API:**
   - **Endpoint:** `/api/v1/chat`
   - **Method:** POST
   - **Description:** Generate a chat-based response given a prompt.
   - **Request Body:**
     ```json
     {
       "prompt": "Your input prompt goes here."
     }
     ```
   - **Response:**
     ```json
     {
       "response": "Generated response based on the input prompt."
     }
     ```

2. **Summarize API:**
   - **Endpoint:** `/api/v1/summarize`
   - **Method:** POST
   - **Description:** Summarize a given block of text.
   - **Request Body:**
     ```json
     {
       "text": "The text you want to summarize."
     }
     ```
   - **Response:**
     ```json
     {
       "summarized_text": "Summarized version of the input text."
     }
     ```

3. **Extract Keywords API:**
   - **Endpoint:** `/api/v1/extract`
   - **Method:** POST
   - **Description:** Extract main keywords from a given text.
   - **Request Body:**
     ```json
     {
       "text": "The text from which you want to extract keywords."
     }
     ```
   - **Response:**
     ```json
     {
       "summarized_text": "Extracted keywords from the input text."
     }
     ```

4. **Paraphrase API:**
   - **Endpoint:** `/api/v1/paraphrase`
   - **Method:** POST
   - **Description:** Paraphrase a given block of text.
   - **Request Body:**
     ```json
     {
       "text": "The text you want to paraphrase."
     }
     ```
   - **Response:**
     ```json
     {
       "summarized_text": "Paraphrased version of the input text."
     }
     ```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/maulerrr/kaizen.git
