#!/bin/bash
python manage.py runserver &
nginx -g 'daemon off;'