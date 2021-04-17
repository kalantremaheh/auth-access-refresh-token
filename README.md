Install gnupg and its required libraries using the following command:

sudo apt-get install gnupg

Once installed, retry importing the key:

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

sudo apt-get update

sudo apt-get install -y mongodb-org

echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

sudo systemctl daemon-reload

sudo systemctl start mongod

sudo systemctl status mongod


Installing and Configuring Redis

sudo apt update
sudo apt install redis-server

sudo systemctl restart redis.service

sudo systemctl status redis

To test that Redis is functioning correctly, connect to the server using the command-line client:   

redis-cli

http://127.0.0.1:8081/


npm install

