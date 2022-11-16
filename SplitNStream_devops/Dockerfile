# Use a Node 16 base image
FROM node:18-alpine as frontend
# Set the working directory to /app inside the container
WORKDIR /app

# Copy app package files
COPY SplitNStream_frontend/sns-frontend/package*.json .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 

# Copy app src, public files
COPY SplitNStream_frontend/sns-frontend/ .
COPY SplitNStream_frontend/sns-frontend/ .

# ==== BUILD =====
# Build the app
RUN npm run build 

# ++++++++++++++++++++++++++++ 

FROM python:3.8

RUN apt update
RUN apt install -y nginx

COPY SplitNStream_devops/nginx.conf /etc/nginx/sites-enabled
RUN nginx -t

COPY --from=frontend /app/build/ /var/www/html/sns/

COPY SplitNStream_backend/requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

WORKDIR /app/
COPY SplitNStream_backend/src/ /app/

EXPOSE 8100

# RUN service nginx start

COPY SplitNStream_devops/entrypoint.sh /app/
RUN chmod +x entrypoint.sh

CMD [ "./entrypoint.sh" ]