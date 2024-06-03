# Use the Gradle image for the build stage
FROM gradle:latest AS build

# Set the working directory
WORKDIR /backend

# Copy the build files and source code
COPY build.gradle settings.gradle ./
COPY gradle ./gradle
COPY . .

# Build the application
RUN gradle clean build

# Use the OpenJDK image for the runtime
FROM openjdk:17

# Set the working directory
WORKDIR /backend

# Copy the built jar file from the build stage
COPY --from=build /backend/build/libs/backend-0.0.1.jar .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "backend-0.0.1.jar"]
