#db1 db2 db3 as host filesystem to container's volume
mkdir db1 db2 db3
#generate keyfile for mongodb replSet for enabling auth
openssl rand -base64 756 > keyfile
chmod 400 keyfile

#prepare my_mongo.conf
echo "storage:" >> my_mongo.conf
echo "  dbPath: /db" >> my_mongo.conf
echo "replication:" >> my_mongo.conf
echo "  replSetName: replset" >> my_mongo.conf
echo "security:" >> my_mongo.conf
echo "  keyFile: /db/keyfile" >> my_mongo.conf

for db in db1 db2 db3
  do
    cp my_mongo.conf $db/.
    cp keyfile $db/.
  done

#don't need them any more
rm -f keyfile my_mongo.conf

#creat a user-defined docker network
docker network create -d bridge --subnet 172.25.0.0/16 my_network

#start up replicaset
docker run -d --name mongo1 --network my_network -v $(pwd)/db1:/db mongo mongod --config /db/my_mongo.conf
docker run -d --name mongo2 --network my_network -v $(pwd)/db2:/db mongo mongod --config /db/my_mongo.conf
docker run -d --name mongo3 --network my_network -v $(pwd)/db3:/db mongo mongod --config /db/my_mongo.conf

#ensure all above containers have been up
sleep 5

#initiate replset
docker exec -it mongo1 mongo --eval "rs.initiate({_id: 'replset', members: [{_id:0, host:'mongo1:27017'},{_id:1, host:'mongo2:27017'},{_id:2, host:'mongo3:27017'}]})"

#wait for above operation, it may take long
sleep 30

#get the PRIMARY mongod
docker exec -it mongo1 mongo --eval "var a = rs.isMaster(); printjson(a)" > primary.log
PRIMARY=`cat primary.log |grep primary| cut -d"\"" -f4 |awk -F: '{print $1}'`
rm primary.log

#create admin and user
docker exec -it $PRIMARY mongo admin --eval "db.createUser({user: 'admin', pwd:'changeme', roles:[{role: 'root', db: 'admin'}]})"
docker exec -it $PRIMARY mongo articles -u admin -p changeme --authenticationDatabase "admin" --eval "db.createUser({user: 'articleUser', pwd:'changeme', roles:[{role: 'dbOwner', db:'articles' }]})"

#create a application user into articles.user, user's password is hashed
docker exec -it $PRIMARY mongo articles -u articleUser -p changeme --eval "db.user.insertOne({name: 'qusr', email: 'pandafeeder@gmail.com', pwd:'\$2a\$10\$MyOBX1sG/8UF2DyhBcJQBO6DzW6h2hvlxPcK3ZFaa.Lj1nyceK3mi'})"

#all above is for preparing database, since some of the operation can't be done within docker composer

docker-compose up -d
