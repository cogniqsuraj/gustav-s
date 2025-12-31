# Gustav's Image Download Script
# Downloads diverse, themed images from Unsplash

Write-Host "Gustav's Website - Image Setup" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Downloading diverse images for each section..." -ForegroundColor Cyan
Write-Host ""

# Image URLs from Unsplash - Each category has unique, themed images
$images = @{
    # Hero Slider - Mountain views, outdoor dining, cozy interiors
    "hero-mountains.jpg" = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80"
    "hero-beer-garden.jpg" = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop&q=80"
    "hero-fireplace.jpg" = "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&h=1080&fit=crop&q=80"
    
    # About Section - Restaurant interiors, Bavarian food, beer
    "about-tavern.jpg" = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80"
    "about-food.jpg" = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&q=80"
    "about-beer.jpg" = "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800&h=600&fit=crop&q=80"
    
    # Menu Highlights - Pretzels, beer taps, schnitzel
    "menu-pretzel-brats.jpg" = "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&q=80"
    "menu-beer.jpg" = "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop&q=80"
    "menu-schnitzel.jpg" = "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&h=600&fit=crop&q=80"
    
    # Experience Section - Outdoor seating, fireplace, restaurant atmosphere
    "exp-beer-garden.jpg" = "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop&q=80"
    "exp-fireplace.jpg" = "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=800&h=600&fit=crop&q=80"
    "exp-atmosphere.jpg" = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80"
    
    # Chatbot Avatar - Friendly beer/Bavarian theme
    "bot-avatar.jpg" = "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=300&h=300&fit=crop&q=80"
}

$assetsPath = "G:\Projects\Gustav\assets"

Write-Host "Downloading images to: $assetsPath" -ForegroundColor Cyan
Write-Host ""

$count = 0
$total = $images.Count

foreach ($img in $images.GetEnumerator()) {
    $count++
    $filename = $img.Key
    $url = $img.Value
    $outputPath = Join-Path $assetsPath $filename
    
    Write-Host "[$count/$total] Downloading $filename..." -ForegroundColor Green
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -ErrorAction Stop
        Write-Host "  ✓ Downloaded successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "  ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "================================" -ForegroundColor Yellow
Write-Host "Download Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Open index.html in your browser" -ForegroundColor White
Write-Host "2. Replace placeholder images with actual Gustav's photos" -ForegroundColor White
Write-Host "3. Update contact information if needed" -ForegroundColor White
Write-Host ""
Write-Host "For best results, source images from:" -ForegroundColor Yellow
Write-Host "- Instagram: @leavenworthgustavs" -ForegroundColor White
Write-Host "- Facebook: /gustavsleavenworthwa" -ForegroundColor White
Write-Host ""
