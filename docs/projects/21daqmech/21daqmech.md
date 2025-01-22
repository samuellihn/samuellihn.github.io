---
title: 21XT DAQ System Integration
date: 2024-12-20
status: In Progress
thumbnail: accessory.png
images:
  - accessory.png
  - accessory-section.png
  - main.png
  - mainthermal.png
  - mainthermal2.png
description: Data Acquisition System Electromechanical Integration for JH21XT Race Car.
---
I was the electromechanical integration engineer for the data acquisition system on the JH21XT race car. This system collects crucial telemetry data such as suspension travel, engine speed and transmission shift behavior, which is then fused to reconstruct the configuration of the vehicle during race scenarios. However, the off-road nature of the Baja race creates challenging environmental circumstances for electronics, and proper integration ensures that these electronics are not destroyed during the race.

I was responsible for the accessory and main boxes as well as the wiring harness on the car. The accessory box contains analog circuitry and a Teensy 4.1 microcontroller and collects data from various sensors, while the main box contains a Raspberry Pi 5 which collects data, processes it, and sends it over radio to a base station. Both enclosures were designed to be as light as possible while meeting or exceeding IP67 water resistance to ensure the electronics can survive immersion in mud or water. In addition, A custom heatpipe-based thermal solution was designed and analyzed in Ansys Icepak ensure the SBC in the main box would not overheat, an issue that was observed last season. 