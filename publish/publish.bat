cd ../
python ./publish/combine.py
pandoc ./publish/combined.md --reference-doc=./publish/reference.docx -o ./publish/docs.docx

pause