let div_res = document.getElementById('search_it')
let btn = document.getElementById('btn')
let value_txt = document.getElementById('value_txt')
let img_num = document.getElementById('img_num')


btn.addEventListener('click', function(){
   let search_txt = value_txt.value
   let num = img_num.value
   $("#search_it").empty()
   if(search_txt !== '' && num !== ''){
      api_call(search_txt , num)

   }else {
      div_res.innerHTML = '<h3 class="error_msg">Please enter search text and number of images</h3>'
   }
})

// 
function api_call(search , number){
   let xml = new XMLHttpRequest();
   xml.open('get' , 'https://api.tenor.com/v1/search?q='+search+'&key=ESEXE919EH8A&limit='+number , true);
   xml.responseType = 'json'
   xml.send()
   xml.onreadystatechange = function(){
      if(xml.readyState === 4){
         let retrieve = this.response.results;
         if(retrieve.length >= 1){
            for( let i=0; i < retrieve.length; i++){
               let img_src = retrieve[i].media[0].gif.url 
               let img_tag = document.createElement('img')
               img_tag.setAttribute('src',img_src)
               img_tag.setAttribute('class','images')
               div_res.append(img_tag)
               
               
               img_tag.addEventListener('mouseenter', function(){
                  $(this).css('width', '300px');
                  $(this).css('height', '300px');
               });
               img_tag.addEventListener('mouseout', function(){
                  $(this).css('width', '200px');
                  $(this).css('height', '200px');
               });
         }
         }else {
            div_res.innerHTML = '<h3 class="error_msg">Not found, Please enter a new search.</h3>'
         }
         
      }
      
   } 
}
    //response_objects.results.forEach((gifObj, i) => {
  //if (i >= 8) return;
  // do something with each gifObj
  //document.querySelector('.container')
  //  .appendChild(document.createElement('img'))
   // .src = gifObj.media[0].tinygif.url;
//});
//url = top_8gifs['results'][i]['media'][0]['gif']['url'] #This is the url from json
