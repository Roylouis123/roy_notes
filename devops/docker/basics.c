
docker version // to check docker version


docker run -it ubuntu // it will install ubuntu and run 

docker build -t roytest .  // build docker img

docker container ls  // displays list of docker containers

docker image ls // displays list of docker

docker build -t roytest .  // build docker img with username

docker push roylouis123/roytest  // deploy image to docker hub repo




ceating volumes in docker 

docker volume ls  // displays list of docker

docker volume create data // create data directory

docker run -it -v data:/docker_roy ubuntu bash  // mounts data folder to docker_roy folder






docker run -it -v data:/docker_roy ubuntu bash



https://hub.docker.com/  // for images 