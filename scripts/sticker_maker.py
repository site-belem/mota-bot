import sys
import os
import colorsys
from PIL import Image, ImageDraw, ImageFont

def create_sticker(text, output_path, is_rgb=False):
    size = (512, 512)
    font_paths = [
        "/system/fonts/Roboto-Bold.ttf",
        "/system/fonts/DroidSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "Arial.ttf"
    ]
    
    font = None
    font_size = 100
    if len(text) > 10: font_size = 70
    if len(text) > 20: font_size = 40

    for path in font_paths:
        if os.path.exists(path):
            font = ImageFont.truetype(path, font_size)
            break
    if not font:
        font = ImageFont.load_default()

    if not is_rgb:
        # Figurinha Estática (Preta com borda branca ou vice-versa)
        img = Image.new('RGBA', size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        try:
            bbox = draw.textbbox((0, 0), text, font=font)
            w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
            position = ((size[0]-w)/2, (size[1]-h)/2)
            # Desenha borda para visibilidade
            for adj in range(-2, 3):
                for adj2 in range(-2, 3):
                    draw.text((position[0]+adj, position[1]+adj2), text, font=font, fill="white")
            draw.text(position, text, fill="black", font=font)
        except:
            draw.text((50, 200), text, fill="black", font=font)
        img.save(output_path, "WEBP", quality=80)
    else:
        # Figurinha RGB Animada (Otimizada)
        frames = 10 # Reduzido de 20 para 10 para ser mais rápido
        duration = 80
        images = []
        for i in range(frames):
            img = Image.new('RGBA', size, (0, 0, 0, 0))
            draw = ImageDraw.Draw(img)
            hue = i / frames
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            color = (int(rgb[0]*255), int(rgb[1]*255), int(rgb[2]*255), 255)
            try:
                bbox = draw.textbbox((0, 0), text, font=font)
                w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
                position = ((size[0]-w)/2, (size[1]-h)/2)
                draw.text(position, text, fill=color, font=font)
            except:
                draw.text((50, 200), text, fill=color, font=font)
            images.append(img)
        
        images[0].save(
            output_path,
            save_all=True,
            append_images=images[1:],
            duration=duration,
            loop=0,
            quality=50, # Qualidade reduzida para processamento mais rápido
            method=4
        )

if __name__ == "__main__":
    if len(sys.argv) > 2:
        mode = sys.argv[3] if len(sys.argv) > 3 else "static"
        create_sticker(sys.argv[1], sys.argv[2], is_rgb=(mode == "rgb"))
