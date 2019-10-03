import youtube_dl

url = 'https://www.youtube.com/watch?v=6_b7RDuLwcI'
ydl = youtube_dl.YoutubeDL({})

video = ydl.extract_info(url, download=False)

print('{} - {}'.format(video['artist'], video['track']))