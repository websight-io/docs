#!/bin/sh
CMS_STARTER_TAG='1.23.0'
ECHO_RED_BOLD='\033[1;31m'
ECHO_GREEN_BOLD='\033[1;32m'
ECHO_YELLOW_BOLD='\033[1;33m'
ECHO_NO_COLOR='\033[0m'
MAX_RETRIES=100;
counter=1;
if [ -x "$(command -v docker)" ]; then
    curl --silent https://docs.websight.io/scripts/logo.ascii.txt
    {
        sleep 5
        until curl --output /dev/null --silent --head --fail 'http://localhost:8080/system/health'; do
            echo "${ECHO_YELLOW_BOLD}***WebSight Launcher*** WebSight is still getting ready for you... Check no. [$((counter++))/$MAX_RETRIES]${ECHO_NO_COLOR}"
            if [ $counter -gt $MAX_RETRIES ] ; then
                echo "${ECHO_YELLOW_BOLD}***WebSight Launcher*** Giving up! Please open http://localhost:8080 in your browser.${ECHO_NO_COLOR}"
                exit 1;
            fi
            sleep 1
        done
        sleep 1
        echo "${ECHO_GREEN_BOLD}***WebSight Launcher*** WebSight is ready.${ECHO_NO_COLOR} Launching the browser..."
        open http://localhost:8080
    }&
    docker run -p 8080:8080 --name websight-cms --rm --mount source=segment-store-repository,target=/websight/launcher/repository europe-docker.pkg.dev/websight-io/public/websight-cms-starter:${CMS_STARTER_TAG}
else
    echo "${ECHO_RED_BOLD}Docker is not found on the system${ECHO_NO_COLOR}"
fi

trap "trap - SIGTERM && kill $! 2>/dev/null" SIGINT SIGTERM EXIT 2>/dev/null