# Zone In: Query zonings within neighbourhood

[CHECK THE WEB APPLICATION](https://khwong12.github.io/OZP_buffer_stat/)

**Zone In** is a web map application for users to interactively explore the land use zonings in Hong Kong and investigate the distribution of zonings in the proximity in any areas.

## Feature Highlights

- Draw **any** geometries for any area of interested/study areas
- Instantly compute the amount of land uses within buffer
- Immediate summary data visualidation

## Overview

## Example Usage

## How to Use

## Motivation

## Issues

## Licensing

TODO

## Features TODO

- Change contentDiv width for mobile use
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
