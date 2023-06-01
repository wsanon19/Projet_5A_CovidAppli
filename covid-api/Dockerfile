FROM openjdk:17 AS TEMP_BUILD_IMAGE
RUN microdnf install findutils
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY build.gradle settings.gradle gradlew $APP_HOME
COPY gradle $APP_HOME/gradle
RUN ./gradlew classes
COPY . .
RUN ./gradlew build -x test

FROM openjdk:17
ENV ARTIFACT_NAME=covid-api-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/$ARTIFACT_NAME .
EXPOSE 8080
CMD ["java","-jar","/usr/app/covid-api-0.0.1-SNAPSHOT.jar"]