/* Requires the Docker Pipeline plugin */
pipeline {
    agent any
    environment {
      VERSION = '1.0'
    }
    stages {
      stage('build') {
        steps {
          git url: 'https://gitlab.com/luidasa/angular-app-jenkins.git', branch: 'master', credentialsId: 'gitlab-luidasa'
          sh '/usr/bin/ng build --prod'
        }
      }
      stage('build image') {
        steps {
          sh 'docker build -t luidasa/angular-app-jenkins:${VERSION}.${BUILD_NUMBER} .'
        }
      }
      stage('push image to hub') {
        steps {
          withDockerRegistry([credentialsId: "dockerhub", url: ""]) {
            sh 'docker push luidasa/angular-app-jenkins:${VERSION}.${BUILD_NUMBER}'
          }
        }
      }
    }
}
