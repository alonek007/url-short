console.log("srcript working")
const button = document.getElementById("short")
button.addEventListener("click", async function () {
    const originalUrl = document.getElementById("url").value;

    const response = await fetch(
        "https://url-short-production-3dbd.up.railway.app/shorten",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                originalUrl
            })
        }
    )
    const data = await response.json();
    console.log(data)
document.getElementById("result").innerHTML=  `<a href=${data.shortUrl}> 
        ${data.shortUrl} </a>`
})
