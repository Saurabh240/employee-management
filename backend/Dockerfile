# Use an official OpenJDK image as a base
FROM openjdk:11-jdk-slim

# Set working directory
WORKDIR /app

# Copy the application JAR file into the container
COPY target/my-spring-boot-app.jar /app/my-spring-boot-app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "my-spring-boot-app.jar"]