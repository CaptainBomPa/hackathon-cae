FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/root/.m2 mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
ARG JAR_FILE=/app/target/*.jar
COPY --from=build $JAR_FILE /app/backend.jar
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]