"""
This scripts combines all .md files in the given order
and changes image captiones and link
"""

import json
import re

contents_file = 'publish/contents.json'
out_file = 'combined.md'

link_line_regex = r'^[\t0-9\.\s]*?\[.+?\]\(.+?\)[\s]*?$'

image_regex = r'(!\[.+?\]\(.+?\))'
caption_regex = r'\[(.+?)\]'
link_regex = r'\((.+?)\)'

def fix_image(line, folder, chapter_num, picture_num):
    out = ""
    splitted = re.split(image_regex, line)
    for token in splitted:
        if token.startswith('!['):
            caption = re.search(caption_regex, token).group(1)
            link = re.search(link_regex, token).group(1)
            link = link[0:2] + folder + '/' + link[2:]
            token = '![' + 'Рисунок ' + str(chapter_num + 1) + '-' + str(picture_num) + ' — ' + caption + '](' + link + ')'
        out += token
        
    return out
    

def is_link_line(line):
    return re.match(link_line_regex, line)


def proccess_file(file_num, file, folder, chapter_num, picture_num, out):
    with open(folder+'/'+file, 'r', encoding='utf-8') as f:
        for line in f.readlines():
            if is_link_line(line):
                continue
            if file_num and line.startswith('#'):
                line = '#' + line
            line = fix_image(line, folder, chapter_num, picture_num)
            out.write(line)


def combine(contents):
    with open(out_file, 'w', encoding='utf-8') as out:
        """
        Folders are supposed to be chapters
        First folder is supposed to be current one i.e. '.'
        First file in the chapter (folder) is considered to contain Header1
        in other files headers will be inflated (+1 to the header order)
        """
        for chapter_num, folder in enumerate(contents):
            picture_num = 1
            for file_num, file in enumerate(contents[folder]):
                proccess_file(file_num, file, folder, chapter_num, picture_num, out)
        

if __name__ == "__main__":
    with open(contents_file, 'r', encoding='utf-8') as f:
        contents = json.load(f)
    combine(contents)