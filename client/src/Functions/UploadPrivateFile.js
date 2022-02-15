function UploadPrivateFile(r){
    function loadXHR(url) {
        return new Promise(function(resolve, reject) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.responseType = "blob";
                xhr.onerror = function() {reject("Network error.")};
                xhr.onload = function() {
                    if (xhr.status === 200) {resolve(xhr.response)}
                    else {reject("Loading error:" + xhr.statusText)}
                };
                xhr.send();
            }
            catch(err) {reject(err.message)}
        });
    }
    loadXHR(r).then((blob)=>{
        const c = blob;
        c.arrayBuffer().then(r=>{
            const view = new Uint8Array(r);
            console.log(view)
            fetch("http://localhost:3000/createPrivateFile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    file_data: view,
                    file_name: "b.png",
                    file_mime: c.type,
                })
            }).then(r=>r.json()).then(r=>console.log(r.file_data))
        })});
    return "b";
}
export default UploadPrivateFile;