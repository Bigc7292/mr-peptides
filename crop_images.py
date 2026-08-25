import os
from PIL import Image

CONTENT_DIR = r"C:\Users\Alfa\work_personal\01_Active\Clients\BIG_JACK_PEPTIDES\content"
PRODUCTS_DIR = r"C:\Users\Alfa\Downloads\files-4a4e2209\mr-peptides\public\products"
CROP_PERCENT = 0.10

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.webp'}

def crop_bottom_10_percent(image_path):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            crop_height = int(height * (1 - CROP_PERCENT))
            cropped = img.crop((0, 0, width, crop_height))
            cropped.save(image_path, quality=95)
            return True
    except Exception as e:
        print(f"Error cropping {image_path}: {e}")
        return False

def crop_directory(directory):
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return
    
    count = 0
    for root, dirs, files in os.walk(directory):
        for filename in files:
            ext = os.path.splitext(filename)[1].lower()
            if ext not in IMAGE_EXTENSIONS:
                continue
            
            image_path = os.path.join(root, filename)
            if crop_bottom_10_percent(image_path):
                count += 1
                print(f"[CROPPED] {filename}")
    
    return count

def main():
    print("=== Cropping images (removing bottom 10%) ===\n")
    
    print("1. Processing source content directory...")
    content_count = crop_directory(CONTENT_DIR)
    print(f"   Cropped {content_count} images in content folder\n")
    
    print("2. Processing website products directory...")
    products_count = crop_directory(PRODUCTS_DIR)
    print(f"   Cropped {products_count} images in products folder\n")
    
    print("=== DONE ===")
    print(f"Total images cropped: {content_count + products_count}")

if __name__ == "__main__":
    main()
