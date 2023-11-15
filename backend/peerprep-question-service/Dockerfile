FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN sed -i 's/\r$//' mvnw
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw clean install

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/target/*.jar /app/*.jar
ENTRYPOINT ["java", "-jar", "/app/*.jar" ]