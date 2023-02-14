## Application setup doc for Ubuntu 16.04 LTS

## Setup database MongoDB

```sh
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

sudo apt-get update

sudo apt-get install -y mongodb-org

sudo service mongod start
```

## Install NodeJS using NVM (Node version manager)
```sh
# Install NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash

# Install Node
nvm install v6.9.4
```

## Getting Started

Install yarn and gulp:
```sh
# install yarn and gulp globally
npm install -g yarn gulp
```

Install dependencies:
```sh
# it will install all dependencies specified in the package.json
yarn
```

Set environment (vars):
```sh
# Copy sample .env file and change values as needed
cp .env.example .env
```

Start :
```sh
# Start server
yarn start
```





