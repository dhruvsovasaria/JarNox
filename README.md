# Node.js CI/CD Pipeline with Jenkins

This project demonstrates how to deploy a simple Node.js app using a CI/CD pipeline set up with **Jenkins** on an **AWS EC2 instance**. The pipeline automatically deploys the app whenever new code is pushed to GitHub.

## 🛠️ **Technologies Used**

- **Node.js** for the app
- **Jenkins** for the CI/CD pipeline
- **AWS EC2** to host the app and Jenkins
- **GitHub** to host the code

## ⚙️ **Steps to Set Up**

### 1. **Launch an EC2 instance on AWS**
   - Follow these steps to launch an EC2 instance on AWS:
     - Use the **Ubuntu 22.04 LTS** AMI.
     - Ensure you open ports 22 (SSH), 8080 (Jenkins), and 3000 (Node.js app).
     - Create and download a key pair to SSH into the instance.

### 2. **Install Jenkins on EC2**
   - SSH into the instance:
     ```bash
     ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
     ```
   - Run the following commands to install Jenkins:
     ```bash
     sudo apt update && sudo apt upgrade -y
     sudo apt install openjdk-17-jdk
     sudo wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
     sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
     sudo apt update
     sudo apt install jenkins
     sudo systemctl start jenkins
     sudo systemctl enable jenkins
     ```
   - Access Jenkins via `http://<your-ec2-public-ip>:8080` and set up Jenkins with the initial password.

### 3. **Configure the Jenkins Pipeline**
   - In Jenkins, create a new **Pipeline** job.
   - Set the **GitHub repository URL** in the Jenkins pipeline job.
   - Create a `Jenkinsfile` in your GitHub repo with the following steps:
     - Clone the code.
     - Install dependencies using `npm install`.
     - Run the app.

     **Sample `Jenkinsfile`:**

     ```groovy
     pipeline {
       agent any

       stages {
         stage('Clone') {
           steps {
             git 'https://github.com/yourusername/your-repo.git'
           }
         }
         stage('Install dependencies') {
           steps {
             sh 'npm install'
           }
         }
         stage('Run app') {
           steps {
             sh 'pkill node || true'      // stop existing node process
             sh 'nohup node app.js &'
           }
         }
       }
     }
     ```

### 4. **Set up GitHub Webhook**
   - In GitHub, go to your repo's **Settings > Webhooks**.
   - Add a webhook with the following details:
     - **Payload URL**: `http://<your-ec2-public-ip>:8080/github-webhook/`
     - **Content type**: `application/json`
     - **Trigger**: Push event

### 5. **Push Code to GitHub**
   - After pushing code to your GitHub repo, Jenkins will automatically trigger and deploy the app to the EC2 instance.

## 🚀 **Accessing the Application**

Once the app is deployed, you can access it at:
- `http://<your-ec2-public-ip>:3000`

You should see the **"Hello World"** message.

## ⚠️ **Assumptions & Limitations**

- The EC2 instance is **publicly accessible** (make sure your security group allows HTTP and SSH).
- You are using **AWS EC2** for hosting the app and Jenkins.
- The app is **simple** and only contains a single route for demonstration.

## 📸 **Screenshots**

![WhatsApp Image 2025-05-05 at 22 39 50_69db74ed](https://github.com/user-attachments/assets/0f4330c3-f0e9-46c2-9c3b-646c5d079480)
![WhatsApp Image 2025-05-05 at 18 55 39_307af2f2](https://github.com/user-attachments/assets/cb4df055-299a-4e8d-ba5d-6b605c127dc6)
![WhatsApp Image 2025-05-06 at 02 00 16_a13da3e7](https://github.com/user-attachments/assets/f44d7716-e11c-45ec-bec7-e394bba1831c)
![WhatsApp Image 2025-05-06 at 01 43 30_c0fd4f15](https://github.com/user-attachments/assets/5e8a3d06-0aae-47d5-9b2d-59ff6e209ad7)



---

### ✅ Step 2: Push the `README.md` to GitHub

```bash
git add README.md
git commit -m "Added project documentation"
git push origin main
