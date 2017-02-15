docker stop nginx
docker stop node{1,2,3}
docker stop mongo{1,2,3}
docker rm mongo{1,2,3}
docker rm node{1,2,3}
docker rm nginx

rm -rf db* keyfile my_mongo.conf
docker network rm my_network
docker volume rm $(docker volume ls -q)
