#!/bin/sh
MAX_RETRIES=100;
counter=1;
if [ -x "$(command -v docker)" ]; then
    rm -rf websight-cms-ce/
    mkdir websight-cms-ce
    cd websight-cms-ce
    curl --silent https://www.websight.io/scripts/docker-compose.yml --output docker-compose.yml
    curl --silent https://www.websight.io/scripts/admin_password.txt --output admin_password.txt
    curl --silent https://www.websight.io/scripts/logo.ascii.txt
    {
        sleep 5
        until curl --output /dev/null --silent --head --fail "http://localhost:8080/system/health"; do
            echo "***WebSight Launcher*** WebSight is still getting ready for you... Check no. [$((counter++))/$MAX_RETRIES]"
            if [ $counter -gt $MAX_RETRIES ] ; then
                echo "***WebSight Launcher*** Giving up! Please open http://localhost:8080 in your browser."
                exit 1;
            fi
            sleep 1
        done
        sleep 1
        echo "***WebSight Launcher*** WebSight is ready. Launching the browser"
        open http://localhost:8080
    }&
    docker compose up
else
    echo "Docker is not found on the system"
fi

trap "trap - SIGTERM && kill $! 2>/dev/null" SIGINT SIGTERM EXIT 2>/dev/null