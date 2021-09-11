pipeline {
   agent any

   environment {
     // You must set the following environment variables
     // ORGANIZATION_NAME
     // DOCKERHUB_USERNAME (it doesn't matter if you don't have one)

     SERVICE_NAME = "microfinnext-frontend"
     REPOSITORY_TAG="${DOCKER_REGISTRY}/${ORGANIZATION_NAME}-${SERVICE_NAME}:${BUILD_ID}"
   }

   stages {
      stage('Preparation') {
         steps {
            cleanWs()
            git branch: 'test', credentialsId: 'Gitlab', url: "http://blue.mf360@172.16.211.15/${ORGANIZATION_NAME}/${SERVICE_NAME}"
         }
      }


      stage('Build and Push Image') {
         steps {
           sh 'docker image build -t ${REPOSITORY_TAG} .'
	       sh 'docker push ${REPOSITORY_TAG}'
           sh 'docker rmi ${REPOSITORY_TAG}'
         }
      }

      stage('Deploy to Cluster') {
          steps {
                    sh 'envsubst < ${WORKSPACE}/deploy.yaml | kubectl apply -f -'
          }
      }
   }
}

