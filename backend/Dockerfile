# Use an official OpenJDK image as a base
FROM openjdk:11-jdk-slim

# Set working directory
WORKDIR /app

# Copy the application JAR file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "backend.jar"]
