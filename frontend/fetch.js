const url = "http://localhost:3000/api/data'";
sendNews = async(login, news) =>
{

    try {
            const response = await fetch(url,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({login:login,news:news})
            });
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }else{console.log("отправилось")}
        }
    catch (error) {
        console.error(error.message);
    } 
}