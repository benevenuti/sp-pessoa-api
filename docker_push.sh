#!/bin/bash

JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_271.jdk/Contents/Home

echo "Capturando versao MVN"

MVN_VERSION=$(mvn -q \
  -Dexec.executable=echo \
  -Dexec.args='${project.version}' \
  --non-recursive \
  exec:exec)

echo $MVN_VERSION

docker tag sp-pessoa-api:$MVN_VERSION benevenuti/sp-pessoa-api:$MVN_VERSION

docker push benevenuti/sp-pessoa-api:$MVN_VERSION