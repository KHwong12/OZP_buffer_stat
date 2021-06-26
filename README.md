# Zone In: Query zonings within neighbourhood

## [CHECK THE WEB APPLICATION](https://khwong12.github.io/OZP_buffer_stat/)

![](fig/overview.png)

**Zone In** is a web map application for users to interactively explore the land use zonings in Hong Kong and investigate the distribution of zonings in the proximity in any areas.

**Zone in** is useful to you when:

- You would like to do a quick exploratory analysis about the land use composition of a specific project site
- You want to check the percentage of land zoned as residential within certain distance (say, 400 m) away from a building
- You want to check the gazette date of a zone
- ... and more

## Feature Highlights

- Draw **any** geometries for any area of interested/study areas
- Instantly compute the total area and percentage of total of various land uses within given distance
- Immediate summary data visualidation

## Overview

## Example Usage

## How to Use

## Motivation

## Issues

## Licensing

TODO

## Features TODO

- Add historical OZP to show temporal changes

## UI TODO

- allow users to control transparency of OZP layer
- use "reverse-clip" to disable/decrease opacity of the zones outside query geometry


## Possible performance improvements

- drop async/await

## Caveats

Only zonings **on land** are shown and included in the calculation of OZP area. Zonings on water like following are excluded:

- *Marine Basin* (in H24)
- *Typhoon Shelter* (in H15, K20, I-CC, etc.)
- *Vessel Anchorage / Sea Channel* (in I-SKC)
- *River Channel* (in ST, I-TOTC, etc.)
- *Nullah* (in K15, etc.)
- *Inlet* (in I-NEL)

---

## Usage for Developers

To locally build and preview this website, follow the steps below.

1. Clone this project
    ```sh
    git clone https://github.com/KHwong12/OZP_buffer_stat.git
    ```
2. Make sure **npm** and **node.js** are installed in your machine
3. At project root folder, install the npm dependencies
    ```sh
    npm install
    ```
4. Run this project on local server
   ```sh
   npm run dev-server
   ```
