Get-ChildItem -Path . -Force -ea 0 |Where-Object {$_.PsIsContainer -eq $True} |

ForEach-Object {

    cd $PSItem.FullName
    $files = (Get-ChildItem *.md).FullName
    if ($files.Count) {
        pandoc $files -F pandoc-crossref -o result.docx
    }
    cd ..

}

pandoc (Get-ChildItem result.docx -Recurse -Force).FullName --reference-doc=custom-reference-1.docx -o end_result.docx