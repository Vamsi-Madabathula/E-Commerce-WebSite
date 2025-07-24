// It contacts the backend.
// Gets product data.
// Creates and adds product cards (clothes and accessories) to your webpage.
// Updates cart counter if present.

let contentTitle;

console.log(document.cookie) 

function dynamicClothingSection(ob)
{
    let boxDiv = document.createElement("div")
    boxDiv.id = "box";

    let boxLink = document.createElement("a") ;
    // boxLink.href = '#'
    boxLink.href ="/contentDetails.html" + ob.id;

    let imgTag = document.createElement("img")
    imgTag.src = ob.preview;

    let detailsDiv = document.createElement("div")
    detailsDiv.id = "details"

    let h3 = document.createElement("h3")
    let h3Text = document.createTextNode(ob.name)
    h3.appendChild(h3Text)

    let h4 = document.createElement("h4")
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)

    let h2 = document.createElement("h2")
    let h2Text = document.createTextNode("Rs " + ob.price);
    h2.appendChild(h2Text)

    boxDiv.appendChild(boxLink)
    boxLink.appendChild(imgTag)
    boxLink.appendChild(detailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(h4)
    detailsDiv.appendChild(h2)

    console.log(boxDiv)
    return boxDiv;
}

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories")

// --------BACKEND CALLING-------
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
// 0	Request not initialized
// 1	Server connection established
// 2	Request received
// 3	Processing request (loading)
// 4	Request finished and response is ready ✅
    if(this.readyState === 4){
        if(this.status == 200) // status == 200 means "OK" → the server sent a successful response.
        {
            contentTitle = JSON.parse(this.responseText); 
            // this.responseText contains the JSON data sent by the API.
            // JSON.parse(...) converts that string into a JavaScript array/object 
            // ----UPDATING CART BADGE FROM COOKIES-----
            if(document.cookie.indexOf(",counter=") >=0) {
                var counter = document.cookie.split(",")[1].split("=")[1]
                document.getElementById("badge").innerHTML = counter;
            }

            // --------CREATE UI FOR EACH PRODUCT--------
            for(let i=0; i<contentTitle.length;i++) {
                if(contentTitle[i].isAccessory) {
                    console.log(contentTitle[i])
                    containerAccessories.appendChild(
                        dynamicClothingSection(contentTitle[i])
                    );
                }
                else{
                    console.log(contentTitle[i])
                    containerClothing.appendChild(
                        dynamicClothingSection(contentTitle[i])
                    )
                }
            }

        }
        else {
            console.log("call failed!")
        }

    }
}
// Opens a GET request to the product API.
// Sends the request to fetch the product d
httpRequest.open(
    "GET",
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
    true
);
httpRequest.send();

// Each product in contentTitle looks like:
// {
//   id: "1",
//   name: "Men Navy Blue Solid Sweatshirt",
//   brand: "United Colors of Benetton",
//   price: 2599,
//   preview: "https://some-image-link.jpg",
//   isAccessory: false
// }
console.log("end")