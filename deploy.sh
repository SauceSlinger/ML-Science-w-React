#!/bin/bash

# ML Science Explorer - Quick Deploy Script
# This script helps you deploy to GitHub Pages in one command

echo "🚀 ML Science Explorer Deployment Script"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit with timestamp
echo "💾 Committing changes..."
git commit -m "Deploy ML Science Explorer - $(date '+%Y-%m-%d %H:%M:%S')"

# Check if remote origin exists
if ! git remote | grep -q "origin"; then
    echo "⚠️  No GitHub remote found."
    echo "Please follow these steps:"
    echo "1. Create a new repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/ml-science-explorer.git"
    echo "3. Run this script again"
    exit 1
fi

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click Settings > Pages"
echo "3. Select 'Deploy from a branch' > main > / (root)"
echo "4. Your site will be live in 5-10 minutes"
echo ""
echo "🌟 Once deployed, your ML Science Explorer will showcase:"
echo "   📊 16 Interactive ML Examples"
echo "   🎯 Real-time Data Generation"
echo "   📱 Mobile-Responsive Design"
echo "   🔬 Complete Algorithm Portfolio"
echo ""
echo "Happy deploying! 🎉"