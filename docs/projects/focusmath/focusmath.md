---
title: FocusMath
date: 2020-06-01
status: Completed
thumbnail: check-1.png
images: 
- capture-1.png
- solve-1.png
- capture-2.png
- check-1.png
- check-block.png
- solve-block.png
description: An app that solves and explains math problems to assist asynchronous math learning
---
**In collaboration with: Jason Liu, Arha Gatram**

FocusMath is a learning aid that scans and checks math problems for errors and provides explanations for middle-school and early high-school level math. Students can use their phone cameras to scan their solution to a math problem and the app will identify errors in the student's work.

Once a student scans a problem, the app will provide a solution page that checks the problem and explains the solution to the problem. Students can also check their work. Other users can use the app to generate the solution to any math problem.

This app was submitted to the 2020-21 New Jersey Congressional App Challenge. Watch the video [here](https://www.youtube.com/watch?v=zqLBaZ4GCo8).


# Technical Details
This app was built with Python using the [Kivy](https://kivy.org/#home) framework. The MathPix OCR API is used to generate a LaTeX representation of the source image. The problem is then parsed into an expression tree and solved using the Wolfram Alpha API. The solutions are then rendered using a custom-built LaTeX renderer written in C++. The engine was compiled with Cython to reduce app launch time and increase speed.

This was my first time creating a mobile app, so the app is monolithic and does not operate off a backend. If I were to write this again, I would make a web app (for simpler LaTeX rendering) and connect that to a backend that calls the external APIs. 
