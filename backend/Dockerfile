# Stage 1: Build application using Maven & JDK 17
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and backend source code
COPY pom.xml .
COPY src ./src

# Package Spring Boot application JAR skipping unit tests
RUN mvn clean package -DskipTests

# Stage 2: Runtime Container with lightweight JRE 17
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy compiled JAR artifact from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose backend port
EXPOSE 8088

ENTRYPOINT ["java", "-jar", "app.jar"]
