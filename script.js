let inputText = document.getElementById("inputText");
let searchBtn = document.getElementById("searchBtn");
let result = document.querySelector(".meaning-container");


const getWordInfo = async (query) => {
    try {
     
    let response =  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
   let data1 =await  response.json();
   console.log(data1)
   let definations = data1[0].meanings[0].definitions[0];

   result.innerHTML = `
        <h2> <strong>Word:</strong>${data1[0].word}</h2>
        <p> ${data1[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong> ${definations.definition== undefined? "Not Found": definations.definition}</p>
        <p><strong>Example:</strong> ${definations.example== undefined? "Not Found" : definations.example}</p>
        <p><strong>Antonym:</strong>  </p>
   `;
    if(definations.antonyms !=""){
   for(let i =0 ; i<definations.antonyms.length ;i++)
   {
      result.innerHTML = result.innerHTML + `<li> ${definations.antonyms[i]} </li>`
   }
}
else{
    result.innerHTML = result.innerHTML + `<span> Not Found</span>`
}

//Adding Read More Button
result.innerHTML = result.innerHTML + `<div><a href="${data1[0].sourceUrls}" target="_blank">Read More</a></div> `;

}

catch (error) {
  result.innerHTML = `<p> Sorry the word could not be found</p>`
}
}




searchBtn.addEventListener('click',(e) => {
   
    let data = inputText.value.trim();
   if(data =="")
    {
    alert("enter something");
   }
   else
   {
     getWordInfo(data);
   }
});
