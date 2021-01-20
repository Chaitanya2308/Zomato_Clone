
var container=document.createElement('div');
container.setAttribute('class','container')
var main_div=document.createElement('div');
 main_div.setAttribute('class','row');

  async function getcategories()
  {
      try {
        var response= await fetch(
            'https://developers.zomato.com/api/v2.1/collections?city_id=280&count=100',
            {
              headers: {
                'Content-Type': 'application/json',
                'user-key': '0504e381a1b2ec8a508064a18ea10900',
              },
            }
          )
          var data=await response.json();
          console.log(data)
      } catch (error) {
       console.log(error)   
      }
     
  }
 getcategories();
 getcitydata(city);
 var city=document.getElementById('cityname').value;
  async function getcitydata()
  {
    var name=document.getElementById('cityname').value;
      try {
        var response= await fetch(
          `https://developers.zomato.com/api/v2.1/cities?q=${name}&count=100`,
            {
              headers: {
                'Content-Type': 'application/json',
                'user-key': '0504e381a1b2ec8a508064a18ea10900',
              },
            }
          )
          var data=await response.json();
          return data;
      } catch (error) {
       console.log(error)   
      }
     
  }  
  async function getcollections()
  {
    var name=document.getElementById('cityname').value;
      try {
        var response= await fetch(
          `https://developers.zomato.com/api/v2.1/cities?q=${name}&count=100`,
            {
              headers: {
                'Content-Type': 'application/json',
                'user-key': '0504e381a1b2ec8a508064a18ea10900',
              },
            }
          )
          var data=await response.json();
          console.log(data);
          var id=data.location_suggestions[0].id;
          var ans=display(id);
          console.log(ans);
      } catch (error) {
       console.log(error)   
      }
     
  }
  async function display(id) 
    {
      try {
                   let response= await fetch(
                    `https://developers.zomato.com/api/v2.1/collections?city_id=${id}&count=100`,
                      {
                        headers: {
                        'Content-Type': 'application/json',
                        'user-key': '0504e381a1b2ec8a508064a18ea10900',
                        },
                       }
                      )
                      let data=await response.json();
                      //var collections=data.collections;
                      function displaycollections(collections)
                      {
                        for(let i=0;i<collections.length;i++)
                        {
                          let  outer_div=document.createElement('div');
                          outer_div.setAttribute("style","display:flex;justify-content:center;padding:5px;")
                          outer_div.classList.add('col-lg-4','col-sm-12');
                          
                          let card_div=document.createElement('div');
                          card_div.classList.add('card');;
                         
                          let image=document.createElement('img');
                          image.classList.add('card-image-top','img-fluid')
                          image.alt="Food Items";
                          image.src=collections[i].collection.image_url;

                          let title=document.createElement('div');
                           title.classList.add('text-white','card-title','bg-dark','text-center');
                            title.innerText=collections[i].collection.title;
                          
                            let card_body = document.createElement("div")
                            card_body.setAttribute("class","card-body")

                            let card_data=document.createElement('p');
                            card_data.classList.add('card-text');
                            card_data.innerText=collections[i].collection.description;

                            let card_url=document.createElement('p');
                            card_url.classList.add('card-text');
                            card_url.innerHTML="Share Url: "+collections[i].collection.share_url;

                            card_body.append(card_data,card_url);
                            card_div.append(title,image,card_body);
                            outer_div.append(card_div);
                            main_div.append(outer_div);
                            container.append(main_div);
                            document.body.append(container);

                        }
                      }
                    displaycollections(data.collections);


                      console.log(data);
                    } catch (error) {
                    console.log(error);
                  }
              }


async function getrestaurents()
{
  var name=document.getElementById('cityname').value;
  try {
    var response= await fetch(
      `https://developers.zomato.com/api/v2.1/locations?query=${name}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'user-key': '0504e381a1b2ec8a508064a18ea10900',
          },
        }
      )
      var data=await response.json();
      console.log(data);
      var entity_name=data.location_suggestions[0].entity_type;
      var entity_id=data.location_suggestions[0].entity_id;
      console.log(entity_name,entity_id)
      let res_data=getlocations(entity_name,entity_id);
      console.log(res_data);
     
  } catch (error) {
   console.log(error)   
  }
}

async function getlocations(entity_name, entity_id) {
  try {
    var response= await fetch(
      `https://developers.zomato.com/api/v2.1/location_details?entity_id=${entity_id}&entity_type=${entity_name}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'user-key': '0504e381a1b2ec8a508064a18ea10900',
          },
        }
      )
      var data=await response.json();
      console.log(data);
      displayrestaurents(data);

      function displayrestaurents(data)
      {
        for(let i=0;i<data.length;i++)
        {
          let  outer_div=document.createElement('div');
          outer_div.setAttribute("style","display:flex;justify-content:center;padding:5px;")
          outer_div.classList.add('col-lg-4','col-sm-12');
          
          let card_div=document.createElement('div');
          card_div.classList.add('card');;
         
          let image=document.createElement('img');
          image.classList.add('card-image-top','img-fluid')
          image.alt="Food Items";
          image.src=data.best_rated_restaurant[i].restaurant.thumb;

          let title=document.createElement('div');
          title.classList.add('text-white','card-title','bg-dark','text-center');
          title.innerText=data.best_rated_restaurant[i].restaurant.name;
          
          let card_body = document.createElement("div")
          card_body.setAttribute("class","card-body")

            let cusine=document.createElement('p');
            cusine.classList.add('card-text');
            cusine.innerText=data.best_rated_restaurant[i].restaurant.cuisines;

            let timings=document.createElement('p');
            timings.classList.add('card-text');
            timings.innerHTML="Timings: "+data.best_rated_restaurant[i].restaurant.timings;
       
            let location=document.createElement('p');
            location.classList.add('card-text');
            location.innerHTML="Location: "+data.best_rated_restaurant[i].restaurant.location.address;

            let Phone_number=document.createElement('p');
            Phone_number.classList.add('card-text');
            Phone_number.innerHTML="Phone_number: "+data.best_rated_restaurant[i].restaurant.phone_numbers;

            let rating=document.createElement('p');
            rating.classList.add('card-text');
            rating.innerHTML="Rating: "+data.best_rated_restaurant[i].restaurant.user_rating.aggregate_rating;
            rating.style.color="#5BA829";


            let average_cost=document.createElement('p');
            average_cost.classList.add('card-text');
            average_cost.innerHTML="Avarage Cost for two: Rs "+data.best_rated_restaurant[i].restaurant.average_cost_for_two;


            card_body.append(cusine,timings,location,Phone_number,rating,average_cost);
            card_div.append(title,image,card_body);
            outer_div.append(card_div);
            main_div.append(outer_div);
            container.append(main_div);
            document.body.append(container);

        }

      }
  } catch (error) {
   console.log(error); 
  }
  
}
  