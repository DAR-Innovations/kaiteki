# Use the Gradle image for the build stage
FROM gradle:latest AS builder

# Set the working directory
WORKDIR /home/gradle/project

# Copy the Gradle wrapper and the build.gradle and settings.gradle files
COPY build.gradle settings.gradle /home/gradle/project/

# Download dependencies
RUN gradle dependencies --no-daemon

# Copy the rest of the application code
COPY . /home/gradle/project/

# Build the application
RUN gradle build --no-daemon

# Stage 2: Run the application
FROM openjdk:17

# Set the working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /home/gradle/project/build/libs/backend-0.0.1.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions",  "-XX:+UseCGroupMemoryLimitForHeap",  "-jar", "app.jar"]
