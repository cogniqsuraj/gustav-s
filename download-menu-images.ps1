# Download menu images from Gustav's website
$baseUrl = "https://static.spotapps.co/spots"
$outDir = "g:\Projects\Gustav\assets"

$images = @(
    @{name="chicken-wings.jpg"; url="$baseUrl/9b/c26ec9321248c98fcb644017f99c42/full"},
    @{name="pretzel-sticks.jpg"; url="$baseUrl/f4/5f9597113f4723b6c6c039b0d5c007/full"},
    @{name="gustavs-burger.jpg"; url="$baseUrl/12/3175824cc74659be3d180cbc4e844c/full"},
    @{name="pepper-jack-burger.jpg"; url="$baseUrl/93/53a7567cc24c19b0e38886b5f41749/full"},
    @{name="bison-burger.jpg"; url="$baseUrl/05/ea53db40ee45e0a28820d0aeb5b403/full"},
    @{name="bratwurst-burger.jpg"; url="$baseUrl/b3/18e964f9d0433fa20df6677c0e025b/full"},
    @{name="schnitzel-burger.jpg"; url="$baseUrl/35/3e22372ad5450ca82c7c8229cf59be/full"},
    @{name="patty-melt.jpg"; url="$baseUrl/21/8e297b08c34da295bb4b764d0fcee7/full"},
    @{name="reuben.jpg"; url="$baseUrl/d3/2583214fb94d71b9a5e6c4b91e9513/full"},
    @{name="chicken-ortega.jpg"; url="$baseUrl/ba/4194223fe540ac9d8c8dfdf08c8890/full"},
    @{name="fish-chips.jpg"; url="$baseUrl/c8/13c8713a9c4e9894655610251f82f2/full"},
    @{name="bratwurst.jpg"; url="$baseUrl/68/08fc51c13e44c0905cc40ddd6a0063/full"},
    @{name="knackwurst.jpg"; url="$baseUrl/a0/c3aac066b34ce39689dc651505e1fd/full"},
    @{name="sausage-platter.jpg"; url="$baseUrl/53/475fe3330d464e98408036b4dc6478/full"},
    @{name="strawberry-salad.jpg"; url="$baseUrl/a3/906dce675b4da197be0a5e6d63d894/full"},
    @{name="salmon-salad.jpg"; url="$baseUrl/64/aa254fdd5d4981aa850829102301b0/full"}
)

foreach ($img in $images) {
    Write-Host "Downloading $($img.name)..."
    Invoke-WebRequest -Uri $img.url -OutFile "$outDir\$($img.name)"
}
Write-Host "Done!"
