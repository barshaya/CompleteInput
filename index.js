const api = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const search= document.getElementById('search');
const matchList=document.getElementById('matchList')

const searchLocations= async searchText =>{
  const res=await fetch(api);
  const locations=await res.json();  
 
  //get marches to current text input
  let matches=locations.filter(location=>{
      const regex=new RegExp(`^${searchText}`,'gi');
      return location.city.match(regex) || location.state.match(regex);
  });

  if(searchText.length === 0){
      matches=[];
      matchList.innerHTML='';
  }
  else{
    // for(match in matches){
    //     const matchcity=match.city.replace(regex,`span class="color">${searchText}</span>`);
    //     const matchstate=match.state=match.state.replace(regex,`span class="color">${searchText}</span>`);
    //     match.city=matchcity;
    //     match.state=matchstate;
    // }
  }

  outputHtml(matches);
};

//show results in HTML
const outputHtml=matches=>{
    if(matches.length>0){
        const html=matches.map(match => `
        <li>
            ${match.city}, ${match.state}
        </li>
    `).join('');
    matchList.innerHTML=html;
    }
};

search.addEventListener('input',()=>searchLocations(search.value));
