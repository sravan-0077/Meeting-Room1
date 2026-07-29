import urllib.request
import zipfile
import io
import os

url = 'https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip'
print("Downloading Maven binary zip...")
data = urllib.request.urlopen(url).read()
print("Extracting Maven...")
with zipfile.ZipFile(io.BytesIO(data)) as z:
    z.extractall('.')
print("Maven setup completed!")
