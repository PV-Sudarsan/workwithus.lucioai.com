# workwithus.lucioai.com
To complete the puzzle
Secret Code Challenge
This repository contains code to decode a secret code and automate answering questions to obtain a Google Form link.
Prerequisites

Python 3.x
Node.js
npm
Postman

Step-by-Step Instructions
1. Decode the Secret Code

Postman Collection: Access the API collection at Postman Link.
Python Script:
Run the command:python3 secretcode.py


This generates an image named secret-code.png containing the secret code for the final stage.



2. Automate Quiz Answers

The final stage requires answering 3 questions within 5 seconds, which is challenging manually. A JavaScript script is provided to automate this process.
Requirements:
Node.js
npm
Install the required package:npm install node-fetch




Run the Script:
Execute the command:node quiz.mjs


The script outputs a Google Form link upon successful execution.



Output

Python Output: secret-code.png with the secret code.
JavaScript Output: Google Form link to complete the final stage.
