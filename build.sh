#!/bin/bash

#JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 \
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_271.jdk/Contents/Home \
  ./mvnw -U clean install \
  -Dmaven.test.skip=true \
  -Dmaven.compiler.source=1.8 \
  -Dmaven.compiler.target=1.8
