function DownloadFileButton({file}){
    console.log(file)
    const url = URL.createObjectURL(file)
    return <div style={{cursor:"pointer", border:"solid", borderWidth:"1px", borderColor:"blanchedalmond", color: "#2f953d"}}>
        <a href={url} download={file.name}>Download</a>
    </div>
}
export default DownloadFileButton;