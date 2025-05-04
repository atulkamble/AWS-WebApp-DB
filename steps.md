1. launch ec2 and connect 

```
cd Downloads 
chmod 400 project.pem
ssh -i "project.pem" ec2-user@ec2-3-88-218-83.compute-1.amazonaws.com
```

2.  

```
sudo yum update -y
sudo yum install git -y
git --version
```

// installn node js

# Download and install nvm:
```
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.15.0".
nvm current # Should print "v22.15.0".

# Verify npm version:
npm -v # Should print "10.9.2".

```
```
node -v
npm -v
```

3. 
```
git clone https://github.com/atulkamble/AWS-WebApp-DB.git
cd AWS-WebApp-DB/
```

4.
```
sudo npm install express --save
node app.js 
```

