$urls = @{
    "tavern-night.jpg" = "https://static.spotapps.co/spots/43/00d38931c746efbf55ddd945932ac0/full"
    "exterior.jpg" = "https://static.spotapps.co/spots/e7/f2e47b6f0e4c0aaa8e438d59db13e4/full"
    "food-table.jpg" = "https://static.spotapps.co/spots/e6/da723beca84bee8fc7b57389cafb1b/full"
    "food-dishes.jpg" = "https://static.spotapps.co/spots/e4/5057d5552948d799787cf6fec17d4f/full"
}

Set-Location "g:\Projects\Gustav\assets"

foreach ($file in $urls.Keys) {
    Write-Host "Downloading $file..."
    try {
        Invoke-WebRequest -Uri $urls[$file] -OutFile $file -ErrorAction Stop
        Write-Host "  Done!"
    } catch {
        Write-Host "  Failed: $_"
    }
}

Write-Host "`nAll downloads complete!"
