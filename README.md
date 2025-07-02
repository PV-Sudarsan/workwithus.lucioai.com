# Secret Code Challenge

This repository contains code to decode a secret code and automate answering questions to obtain a Google Form link.

## Prerequisites

- Python 3.x
- Node.js
- npm
- Postman

## Step-by-Step Instructions

### 1. Decode the Secret Code
- **Postman Collection**: Access the API collection at [Postman Link](https://www.postman.com/material-specialist-92282473/workwithus-lucioai-com/request/2qqgiwl/workwithus-lucioai-com-puzzle-start-to-end?action=share&creator=39184994&ctx=documentation).
- **Python Script**:
  - Run the command:
    ```bash
    python3 secretcode.py
    ```
  - This generates an image named `secret-code.png` containing the secret code for the final stage.

### 2. Automate Quiz Answers
- The final stage requires answering 3 questions within 5 seconds, which is challenging manually. A JavaScript script is provided to automate this process.
- **Requirements**:
  - Node.js
  - npm
  - Install the required package:
    ```bash
    npm install node-fetch
    ```
- **Run the Script**:
  - Execute the command:
    ```bash
    node quiz.mjs
    ```
  - The script outputs a Google Form link upon successful execution.

## Output
- **Python Output**: `secret-code.png` with the secret code.
- **JavaScript Output**: Google Form link to complete the final stage.
