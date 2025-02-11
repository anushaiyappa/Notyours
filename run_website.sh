#!/bin/bash
echo "Starting PixelWall development server..."
python3 -m http.server 8000 &
sleep 2
echo "Server running at http://localhost:8000"
python3 -m webbrowser -n http://localhost:8000