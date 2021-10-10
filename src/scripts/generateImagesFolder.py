"""
Usage: python3 generateImagesFolder.py
This script create src/images folder, according to src/data/images.
All images meet at least size characteristic:
- Size: Full-Screen Background Images - max 1MB, Small Images - around 300 KB.
Some images are manipulated to meet size characteristic:
- Resolution: Max 96dpi
- Width: Max 2000 pixels wide
"""
import os
import glob
import pathlib
import json
import enum
import shutil

class FILE_SIZE_UNIT(enum.Enum):
   BYTES = 1
   KB = 2
   MB = 3
   GB = 4

def convert_unit(size_in_bytes, unit):
   """ Convert the size from bytes to other units like KB, MB or GB"""
   if unit == FILE_SIZE_UNIT.KB:
       return size_in_bytes/1024
   elif unit == FILE_SIZE_UNIT.MB:
       return size_in_bytes/(1024*1024)
   elif unit == FILE_SIZE_UNIT.GB:
       return size_in_bytes/(1024*1024*1024)
   else:
       return size_in_bytes

class ImageGenerator():
    EXTENSIONS = [".jpg", ".png"]

    def __init__(self, input_path, output_path):
        self.input_path = input_path
        self.output_path = output_path
        self.images = []

        if pathlib.Path(self.output_path).exists():
            shutil.rmtree(self.output_path)

        self.run()

    def get_path_in_output(self, input_path_, includeFile = False):
        if not includeFile:
            input_path_ = os.path.dirname(input_path_) + "/"
        relative_path = os.path.relpath(input_path_, self.input_path)
        if relative_path == ".":
            relative_path = ""
        return self.output_path + relative_path

    def traverse_directory(self, dir):
        os.mkdir(self.get_path_in_output(dir))
        for f in os.scandir(dir):
            if f.is_dir():
                self.traverse_directory(f.path + "/")
            if f.is_file():
                if os.path.splitext(f.name)[1].lower() in ImageGenerator.EXTENSIONS:
                    self.images.append(f.path)
                else:
                    shutil.copyfile(f.path, self.get_path_in_output(f.path, True))

    def copy_image(self, image_path):
        kb_size  = convert_unit(os.path.getsize(image_path), FILE_SIZE_UNIT.KB)
        if kb_size > 1024:
            print(kb_size, image_path)

    def run(self):
        self.traverse_directory(input_path)
        for image_path in self.images:
            self.copy_image(image_path)

path = str(pathlib.Path(__file__).parent.resolve())
input_path = path + "/images/"
output_path = path + "/../images/"
ImageGenerator(input_path, output_path)
