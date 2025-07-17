# Portfolio Gallery Population

This project includes an API route to automatically populate portfolio galleries with media from your CMS based on tags.

## 🚀 Quick Usage

### Populate Any Portfolio Type

```bash
# Food Gallery
curl -X POST "http://localhost:3000/api/populate-portfolio-gallery" \
  -H "Content-Type: application/json" \
  -d '{"portfolioType": "food"}'

# Portraits Gallery
curl -X POST "http://localhost:3000/api/populate-portfolio-gallery" \
  -H "Content-Type: application/json" \
  -d '{"portfolioType": "portraits"}'

# Business Gallery
curl -X POST "http://localhost:3000/api/populate-portfolio-gallery" \
  -H "Content-Type: application/json" \
  -d '{"portfolioType": "business"}'

# Products Gallery
curl -X POST "http://localhost:3000/api/populate-portfolio-gallery" \
  -H "Content-Type: application/json" \
  -d '{"portfolioType": "products"}'

# Corporate Events Gallery
curl -X POST "http://localhost:3000/api/populate-portfolio-gallery" \
  -H "Content-Type: application/json" \
  -d '{"portfolioType": "corporate-events"}'

# Short Content Gallery
curl -X POST "http://localhost:3000/api/populate-portfolio-gallery" \
  -H "Content-Type: application/json" \
  -d '{"portfolioType": "short-content"}'
```

## 📋 Prerequisites

1. **Tag your media** in the CMS with appropriate tags:
   - `food` for food photography
   - `portraits` for portrait photography
   - `business` for business photography
   - `products` for product photography
   - `corporate-events` for corporate events
   - `short-content` for short content

2. **Development server running** on `http://localhost:3000`

## ✅ What It Does

- Finds all media with the specified tag
- Creates portfolio if it doesn't exist
- Populates all 32 gallery positions in the masonry layout
- Cycles through media if there are more positions than images
- Returns detailed success/error information

## 🎯 Example Response

```json
{
  "success": true,
  "message": "Successfully populated Food Photography gallery with 25 media items across 32 positions",
  "details": {
    "portfolioType": "food",
    "totalMediaItems": 25,
    "totalPositions": 32,
    "portfolioId": 5,
    "assignments": ["row1.position1 -> Verso-24.webp", "row1.position2 -> Verso-19.webp", "..."]
  }
}
```

## 📁 API Route Location

The API route is located at: `src/app/api/populate-portfolio-gallery/route.ts`

## 🌐 View Results

After population, view your galleries at:

- `/portfolio/food`
- `/portfolio/portraits`
- `/portfolio/business`
- `/portfolio/products`
- `/portfolio/corporate-events`
- `/portfolio/short-content`
