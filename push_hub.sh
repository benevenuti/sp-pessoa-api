#!/bin/bash

MVN_VERSION=$(mvn -q \
  -Dexec.executable=echo \
  -Dexec.args='${project.version}' \
  --non-recursive \
  exec:exec)

echo $MVN_VERSION

docker tag sp-pessoa-api:$MVN_VERSION docker.io/sp-pessoa-api:$MVN_VERSION

docker push docker.io/sp-pessoa-api:$MVN_VERSION
