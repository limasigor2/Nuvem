FROM openjdk:11.0.10-oraclelinux7

COPY validc-1.0.0.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom --spring.config.location=application-properties","-jar","/app.jar"]