pipeline {
    agent any

   
 
    environment {
        NODEJS_HOME = "${tool 'nodejs'}"
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
        DEPLOY_DIR = "/var/deployments/proco-leader"
        APP_NAME = "proco-leader"   
    }
    stages {
        stage('Prepare Deployment Directory') { 
            steps { 
                sh '''
                  sudo rm -rf ${DEPLOY_DIR}
                sudo mkdir -p ${DEPLOY_DIR}
                sudo cp -r . ${DEPLOY_DIR}
                sudo rm -rf ${DEPLOY_DIR}/.git ${DEPLOY_DIR}/.next
                '''
            }
        }
        stage('Install Dependencies') { 
            steps {
                sh '''
                cd ${DEPLOY_DIR}
                npm install
                '''
            }
        }
        stage('Build Application') { 
            steps {
                sh '''
                cd ${DEPLOY_DIR}
                npm run build
                '''
            }
        }
        stage('Restart with PM2') {
            steps {
                sh '''
                cd ${DEPLOY_DIR}
                pm2 restart ${APP_NAME} || pm2 start npm --name ${APP_NAME} -- start
                pm2 save
                '''
            }
        }
    }
}
