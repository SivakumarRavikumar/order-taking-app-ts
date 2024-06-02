# Define the directories to create
$directories = @(
    "src/models",
    "src/routes",
    "src/middlewares",
    "src/controllers",
    "src/utils"
)

# Define the files to create with their initial content
$files = @{
    "src/models/user.ts" = ""
    "src/models/restaurant.ts" = ""
    "src/models/menuItem.ts" = ""
    "src/models/cart.ts" = ""
    "src/models/order.ts" = ""
    "src/routes/auth.ts" = ""
    "src/routes/restaurant.ts" = ""
    "src/routes/menu.ts" = ""
    "src/routes/cart.ts" = ""
    "src/routes/order.ts" = ""
    "src/middlewares/auth.ts" = ""
    "src/controllers/authController.ts" = ""
    "src/controllers/restaurantController.ts" = ""
    "src/controllers/menuController.ts" = ""
    "src/controllers/cartController.ts" = ""
    "src/controllers/orderController.ts" = ""
    "src/utils/validation.ts" = ""
    "src/app.ts" = ""
    "src/config.ts" = ""
    "package.json" = "{}"
    "tsconfig.json" = "{}"
    "nodemon.json" = "{}"
}

# Function to create directories
function Create-Directories {
    param (
        [string[]]$dirs
    )

    foreach ($dir in $dirs) {
        if (-not (Test-Path -Path $dir)) {
            New-Item -ItemType Directory -Path $dir
            Write-Output "Directory created: $dir"
        }
    }
}

# Function to create files
function Create-Files {
    param (
        [hashtable]$files
    )

    foreach ($file in $files.Keys) {
        if (-not (Test-Path -Path $file)) {
            New-Item -ItemType File -Path $file -Value $files[$file]
            Write-Output "File created: $file"
        }
    }
}

# Create the directory structure and files
Create-Directories -dirs $directories
Create-Files -files $files
