pipeline {
  agent any

  parameters {
    string(name: 'container_name', defaultValue: 'Barkbeat-WebApp', description: 'Nombre del contenedor de docker.')
    string(name: 'image_name', defaultValue: 'barkbeat_web_img', description: 'Nombre de la imagene docker.')
    string(name: 'tag_image', defaultValue: 'lts', description: 'Tag de la imagen de la página.')
    string(name: 'container_port', defaultValue: '80', description: 'Puerto que usa el contenedor')
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/PRY20231065/Barkbeat-web-app.git'
      }
    }

    stage('Install & Build') {
      steps {
          script {
            try {
              sh 'docker stop ${container_name}'
              sh 'docker rm ${container_name}'
              sh 'docker rmi ${image_name}:${tag_image}'
            } catch (Exception e) {
              echo 'Exception occurred: ' + e.toString()
            }
          }
          sh 'docker build -t ${image_name}:${tag_image} .'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker run -d --restart always -p ${container_port}:80 --name ${container_name} ${image_name}:${tag_image}'
      }
    }
  }

}
