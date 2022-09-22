if [ -x "$(command -v docker)" ]; then
    rm -rf websight-cms-ce/
    mkdir websight-cms-ce
    cd websight-cms-ce
    curl -s https://www.websight.io/scripts/docker-compose.yml --output docker-compose.yml
    (sleep 10 && open http://localhost:8080)&
    docker compose up
else
    echo "Docker is not found on the system"
fi
