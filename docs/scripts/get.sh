if [ -x "$(command -v docker)" ]; then
    mkdir websight-cms-ce
    cd websight-cms-ce
    curl -s https://www.websight.io/scripts/docker-compose.yml --output docker-compose.yml
    docker compose up
else
    echo "Docker is not found on the system"
fi
