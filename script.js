const inpTitle=document.getElementById('inpTitle')
        const inpPrice=document.getElementById('inpPrice')
        const inpTaxes=document.getElementById('inpTaxes')
        const inpAds=document.getElementById('inpAds')
        const inpDiscount=document.getElementById('inpDiscount')

        let inps=[inpPrice,inpTaxes,inpAds,inpDiscount]

        const total=document.getElementById('total')
        const inpCount=document.getElementById('inpCount')
        const inpCategory=document.getElementById('inpCategory')
        const BtnCreate=document.getElementById('BtnCreate')
        const tableContent=document.getElementById('tableContent')
        const dalleteBroducts=document.getElementById('dalleteBroducts')
        const cancelBTN=document.getElementById('cancelBTN')
        const continueBTN=document.getElementById('continueBTN')
        const inpSearch=document.getElementById('inpSearch')
        

        
        let temp;

        // ##################  TOTAL   ##########################
 
        inps.forEach(onkeyup=function(){
                if(inpPrice.value !== ''){
                    total.innerHTML= +inpPrice.value + +inpTaxes.value + +inpAds.value - inpDiscount.value;
                     total.style.backgroundColor='green'
                }
                else{
                    total.style.backgroundColor='#333'
                }
            
        }
        )
        
        




        // ##################  CREATE ELEMENT   ##########################

        //############ Save in local storage###############
        let data_in_array;
        if(localStorage.data != null){
            data_in_array = JSON.parse(localStorage.data)
        }
        else{
            data_in_array=[];
        }
        let i=data_in_array.length;
        showData()
        deleteAllProducts();

        BtnCreate.onclick=function(){ 
            let product ={
                        title:inpTitle.value.toLowerCase(),
                        price:inpPrice.value,
                        taxes:inpTaxes.value,
                        ads:inpAds.value,
                        discount:inpDiscount.value,
                        total:total.innerHTML,
                        category:inpCategory.value.toLowerCase(),
                    };
            if(BtnCreate.innerHTML == 'Update'){
                data_in_array[temp]=product;
                total.style.backgroundColor='#333';
                BtnCreate.innerHTML='Create'
                clearInps();
                inpCount.style.display='block'
            }
            
               
                
            // ##################  COUNT   ##########################
                else{
                    if(inpCount.value != ''){
                            for(let j=0 ; j<inpCount.value ; j++){
                                data_in_array.push(product);
                            }
                    }
                    
                    else{ data_in_array.push(product);}
                }

                // ##################  LOCAL STORAGE   ##########################

                localStorage.setItem('data',JSON.stringify(data_in_array))
                deletAll.style.display='block';
                showData();
                clearInps();
            
                i++;
             
        
        }
    

            

        // ##################  CLEAR INPUTS   ##########################

        function clearInps(){
                inpTitle.value ='';
                inpPrice.value ='';
                inpTaxes.value ='';
                inpAds.value ='';
                inpDiscount.value ='';
                total.innerHTML ='';
                inpCategory.value ='';
                inpCount.value ='';

        }

        //############## Show data  in brouser #####################

        function showData(){
            let table = '';
            for(i=0;i<data_in_array.length;i++){
                table +=`
                                      <tr>
                                      <td>${i+1}</td>
                                      <td>${data_in_array[i].title}</td>
                                      <td>${data_in_array[i].price}</td>
                                      <td>${data_in_array[i].taxes}</td>
                                      <td>${data_in_array[i].ads}</td>
                                      <td>${data_in_array[i].discount}</td>
                                      <td>${data_in_array[i].total}</td>
                                      <td>${data_in_array[i].category}</td>
                                      <td><button onclick=updateOneProduct(${i}) class="bg-danger rounded-pill border-0 text-light px-3 py-1 ")>UPDATE</button></td>
                                      <td><button onclick=deletOneProduct(${i}) class="bg-danger rounded-pill border-0 text-light px-3 py-1 ">DELETE</button></td>

                            
                              </tr>
                
                `;
                
                         }
                         document.getElementById('tbody').innerHTML=table




      
        }




        // ##################  DELETE ALL   ##########################

        
         function deleteAllProducts(){
             let deletAll = document.getElementById('deletAll');
             if(data_in_array.length !== 0){
                 deletAll.style.display='block';
             }
             deletAll.onclick=function(){
                dalleteBroducts.style.display='block'
                continueBTN.onclick=function(){
                    data_in_array=[];
                    showData();
                    localStorage.clear();
                    deletAll.style.display='none';
                    dalleteBroducts.style.display='none'
                   
                }
                cancelBTN.onclick = function(){
                    dalleteBroducts.style.display='none'
                }
                    
             }
         }deleteAllProducts()




         // ##################  DELETE one PRODUCT   ##########################
   



         function deletOneProduct(i){
            data_in_array.splice(i,1);
            localStorage.data = JSON.stringify(data_in_array)
             showData()
          
         }

         
         //########## Update infos of one product ####################

         function updateOneProduct(i){
           inpTitle.value=data_in_array[i].title;
           console.log(data_in_array[i].title)
           inpPrice.value=data_in_array[i].price;
           inpAds.value=data_in_array[i].ads;
           inpTaxes.value=data_in_array[i].taxes;
           inpDiscount.value=data_in_array[i].discount;
           inpCategory.value=data_in_array[i].category;

           total.innerHTML= +inpPrice.value + +inpTaxes.value + +inpAds.value - inpDiscount.value;
            total.style.backgroundColor='green';
            BtnCreate.innerHTML="Update";
            BtnCreate.style.color='crimson';
            inpCount.style.display='none'
           temp=i;
        }
  

   
   
   
         // ##################  SERCH    ##########################



         // ##################  SERCH by Name   ##########################
         
        function getSerch(id){
            
            if(id === 'searchByTitle' ){
               
                inpSearch.onkeyup=function(){
                   let table = '';
                    for(let i=0 ; i<data_in_array.length ; i++){
                        
                        if(data_in_array[i].title.includes(inpSearch.value)){
                            
                            table +=`
                                      <tr>
                                      <td>${i+1}</td>
                                      <td>${data_in_array[i].title}</td>
                                      <td>${data_in_array[i].price}</td>
                                      <td>${data_in_array[i].taxes}</td>
                                      <td>${data_in_array[i].ads}</td>
                                      <td>${data_in_array[i].discount}</td>
                                      <td>${data_in_array[i].total}</td>
                                      <td>${data_in_array[i].category}</td>
                                      <td><button onclick=updateOneProduct(${i}) class="bg-danger rounded-pill border-0 text-light px-3 py-1 ")>UPDATE</button></td>
                                      <td><button onclick=deletOneProduct(${i}) class="bg-danger rounded-pill border-0 text-light px-3 py-1 ">DELETE</button></td>

                            
                              </tr>
                `
                document.getElementById('tbody').innerHTML=table;
                        }

                        }
                
                }
                










            }
            else{
               
                inpSearch.onkeyup=function(){
                   let table = '';
                    for(let i=0 ; i<data_in_array.length ; i++){
                        
                        if(data_in_array[i].category.includes(inpSearch.value)){
                            
                            table +=`
                                      <tr>
                                      <td>${i+1}</td>
                                      <td>${data_in_array[i].title}</td>
                                      <td>${data_in_array[i].price}</td>
                                      <td>${data_in_array[i].taxes}</td>
                                      <td>${data_in_array[i].ads}</td>
                                      <td>${data_in_array[i].discount}</td>
                                      <td>${data_in_array[i].total}</td>
                                      <td>${data_in_array[i].category}</td>
                                      <td><button onclick=updateOneProduct(${i}) class="bg-danger rounded-pill border-0 text-light px-3 py-1 ")>UPDATE</button></td>
                                      <td><button onclick=deletOneProduct(${i}) class="bg-danger rounded-pill border-0 text-light px-3 py-1 ">DELETE</button></td>

                            
                              </tr>
                `
                document.getElementById('tbody').innerHTML=table;
            }}}}
            inpSearch.focus()
            
         }

        