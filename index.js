const api = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const search= document.getElementById('search');
const matchList=document.getElementById('matchList')

// added backgorund color to the match text
function replaceBG(regex,match,searchText){ 
    return match.replace(regex,`<span class="color">${(match.match(regex))}</span>`);
}


async function searchLocations(searchText){ 
  const res=await fetch(api);
  const locations=await res.json();  
 
  //get marches to current text input
  let matches=locations.filter(location=>{
      const regex=new RegExp(`^${searchText}`,'gi');
      return location.city.match(regex) || location.state.match(regex);
  });

  if(searchText.length === 0 || matches.length==0){
      matches=[];
      matchList.innerHTML='';
  }

  if(matches.length>0){
    const html=matches.map(match => {
    const regex=new RegExp(`^${searchText}`,'gi');
    const cityname=replaceBG(regex,match.city,searchText);
    const statename=replaceBG(regex,match.state,searchText);
        return ` 
        <li>
        ${cityname}, ${statename}
        </li>`;
    }).join('');
    matchList.innerHTML=html;
  }
}

search.addEventListener('input',()=>searchLocations(search.value));
