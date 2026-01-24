#!/bin/bash

curl -X POST -i http://localhost:3000/profiles/ \
-H "Content-Type: application/json" \
-d '{
    "name" : "Kai",
    "description" : "Backend engineer building systems that don’t wake me up at 3 a.m."
}'