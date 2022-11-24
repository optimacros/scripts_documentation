from docxcompose.composer import Composer
from docx import Document
from pathlib import Path

master = 'template.docx'

def get_result_file_paths():
    p = Path(r'.').glob('**/result.docx')
    return [x.absolute() for x in p if x.is_file()]


def combine_via_composer():
    #filename_master is name of the file you want to merge the docx file into
    master = Document(master)

    composer = Composer(master)

    for f in get_result_file_paths():
        doc = Document(f)
        composer.append(doc)

    composer.save("combined.docx")
    

if __name__ == "__main__":
    combine_via_composer()