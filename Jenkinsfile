pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                // Jenkins already clones the repo, this is just to show progress
                echo 'Code checked out from GitHub'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run App') {
            steps {
                // Kill any process on port 3000 (optional, tweak as needed)
                sh 'fuser -k 3000/tcp || true'
                // Start the app in the background
                sh 'nohup node app.js &'
            }
        }
    }
}
