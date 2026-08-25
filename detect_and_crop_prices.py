import os
import re
from PIL import Image
import pytesseract

CONTENT_DIR = r"C:\Users\Alfa\work_personal\01_Active\Clients\BIG_JACK_PEPTIDES\content"
OUTPUT_DIR = r"C:\Users\Alfa\Downloads\files-4a4e2209\mr-peptides\public\products"

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.webp'}

PRICE_PATTERN = re.compile(r'(\$|€|£|USD)?\s?\d{1,4}[.,]\d{2}')

def has_price_in_bottom_left(image_path):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            # Crop bottom-left area: bottom 18% height, left 45% width
            crop_height = int(height * 0.18)
            crop_width = int(width * 0.45)
            bottom_left = img.crop((0, height - crop_height, crop_width, height))
            
            text = pytesseract.image_to_string(bottom_left)
            matches = PRICE_PATTERN.findall(text)
            return len(matches) > 0, text.strip()
    except Exception as e:
        return False, str(e)

def crop_bottom_price(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            # Remove bottom 15% where price typically sits
            crop_height = int(height * 0.85)
            cropped = img.crop((0, 0, width, crop_height))
            cropped.save(output_path, quality=95)
            return True
    except Exception as e:
        print(f"Error cropping {image_path}: {e}")
        return False

def main():
    images_with_prices = []
    total_images = 0
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        for filename in files:
            ext = os.path.splitext(filename)[1].lower()
            if ext not in IMAGE_EXTENSIONS:
                continue
            
            total_images += 1
            image_path = os.path.join(root, filename)
            has_price, ocr_text = has_price_in_bottom_left(image_path)
            
            if has_price:
                images_with_prices.append((image_path, filename, ocr_text))
                print(f"[PRICE FOUND] {filename}")
                print(f"  OCR text: {ocr_text[:200]}")
                
                # Also check if this image exists in products folder and crop it
                product_path = os.path.join(OUTPUT_DIR, filename)
                if os.path.exists(product_path):
                    crop_bottom_price(product_path, product_path)
                    print(f"  -> Cropped: {product_path}")
                else:
                    print(f"  -> Not found in products folder, skipping crop")
            else:
                print(f"[OK] {filename}")
    
    print(f"\n=== SUMMARY ===")
    print(f"Total images scanned: {total_images}")
    print(f"Images with prices: {len(images_with_prices)}")
    for path, name, text in images_with_prices:
        print(f"  - {name}: {text[:100]}")

if __name__ == "__main__":
    main()
