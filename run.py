#!/usr/bin/env python3
"""
XJSON-SERVER Startup Script
Quick launcher for the ΩOS Trinity Kernel FastAPI server
"""

import os
import sys

# Add src/server to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'server'))

# Import and run the main app
from main import main

if __name__ == "__main__":
    main()
