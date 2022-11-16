# streaming
CMPE-272 Final term project

## Docker

- Clone the git repo
- In the root folder, build the docker image with the cmd
    ```shell script
    $ sudo docker build -f SplitNStream_devops/Dockerfile -t sns .
    ```
- Once the image has been built, run the docker image
    ```shell script
    $ sudo docker run -p 9000:8100 sns
    ```
- Your app will be running on localhost:9000
