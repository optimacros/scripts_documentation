"""
This scripts combines all .md files in the given order
and changes image captiones and link
"""

import json
import re
import string
from dataclasses import dataclass

contents_file = 'publish/contents.json'
out_file = 'publish/combined.md'

link_line_regex = r'^[\t0-9\.\s]*?\[.+?\]\(.+?\)[\s]*?$'

internal_link_regex = r'([^!])(\[.+?\]\(.+?\))'
internal_link_parse_regex = r'\[(.+?)\]\((.+?)\)'
header_line_regex = r'^[#\s]+(.+)$'
anchor_regex = r'#(.+?)'
md_file_link = r'.+\.md'

image_regex = r'(!\[.+?\]\(.+?\))'
caption_regex = r'\[(.+?)\]'
link_regex = r'\((.+?)\)'

github_anchor_regex = r'^<a name=".+?"></a>[\s]+$'


@dataclass
class Info:
    contents: dict
    folder: str = None
    chapter_num: int = None
    file: str = None
    file_num: int = None
    picture_num: int = None


def get_header_from_file(path):
    with open(path, 'r', encoding='utf-8') as file_with_header:
        first_line = file_with_header.readline()
        return re.search(header_line_regex, first_line).group(1)


def get_verbouse_link(link, info):
    splitted = re.split(anchor_regex, link)
    if not splitted[0]:
        # if the link has only anchor then it gives ['', %anchor% ,'']
        # in-file link
        return ""
    path = splitted[0]
    if not re.search(md_file_link, path):
        # not an .md file
        return ""
    if path.startswith('../'):
        # other folder
        path = splitted[0][3:]
        dest_folder = path.split('/')[0]
        full_path = path
    else:
        # current folder
        splitted_path = path.split('/')
        filename = splitted_path[0] if len(splitted_path) == 1 else splitted_path[1]
        dest_folder = info.folder
        full_path = info.folder + '/' + filename

    return '**' + get_header_from_file(dest_folder+'/'+contents[dest_folder][0]) + '** — **' + get_header_from_file(full_path) + '**'


def fix_internal_link(line, info):
    out = ""
    splitted = re.split(internal_link_regex, line)
    if len(splitted) == 1:
        # for lines of code which start with '['
        return line
    for i, token in enumerate(splitted):
        if token.startswith('['):
            match = re.search(internal_link_parse_regex, token)
            caption = match.group(1)
            link = match.group(2)
            if not link.startswith('http'):
                # i.e. not external link
                link = get_verbouse_link(link, info)
                link_repr = ' (см. ' + link + ')' if link else ""
                if len(splitted) >= i+2 and splitted[i+1] and splitted[i+1][0] not in string.punctuation:
                    link_repr += ' '
                token = caption + link_repr
        out += token
        
    return out


def fix_image(line, info):
    out = ""
    splitted = re.split(image_regex, line)
    for token in splitted:
        if token.startswith('!['):
            caption = re.search(caption_regex, token).group(1)
            link = re.search(link_regex, token).group(1)
            link = link[0:2] + info.folder + '/' + link[2:]
            token = '![' + 'Рисунок ' + str(info.chapter_num + 1) + '-' + str(info.picture_num) + ' — ' + caption + '](' + link + ')'
            info.picture_num += 1
        out += token
        
    return out
    

def is_link_line(line):
    return re.match(github_anchor_regex, line) or re.match(link_line_regex, line)


def proccess_file(out, info):
    with open(info.folder+'/'+info.file, 'r', encoding='utf-8') as f:
            for line in f.readlines():
                try:
                    if is_link_line(line):
                        continue
                    if info.file_num and line.startswith('#'):
                        line = '#' + line
                    else:
                        line = fix_image(line, info)
                        line = fix_internal_link(line, info)
                except Exception as ex:
                    raise(ex)
                out.write(line)


def combine(info):
    with open(out_file, 'w', encoding='utf-8') as out:
        """
        Folders are supposed to be chapters
        First folder is supposed to be current one i.e. '.'
        First file in the chapter (folder) is considered to contain Header1
        in other files headers will be inflated (+1 to the header order)
        """
        for chapter_num, folder in enumerate(contents):
            info.folder = folder
            info.chapter_num = chapter_num
            info.picture_num = 1
            for file_num, file in enumerate(contents[folder]):
                info.file_num = file_num
                info.file = file
                proccess_file(out, info)
        

if __name__ == "__main__":
    with open(contents_file, 'r', encoding='utf-8') as f:
        contents = json.load(f)
    info = Info(contents)
    combine(info)