
function initInicio() {


    function renderCards() {

        const xhr = new XMLHttpRequest
        xhr.open('get', 'plantillas/card.hbs')
        xhr.addEventListener('load', () => {
            if(xhr.status == 200) {
                let plantillaHbs = xhr.response
                //console.log(plantillaHbs)
    
    
    
                var template = Handlebars.compile(plantillaHbs);
                
                let html = (template({  cards: cards }))
    
        document.getElementById('cards-container').innerHTML = html
            }
        })
        xhr.send()
    }
        renderCards()


        function Card(image,heading,price,details){
            this.image = image
            this.heading = heading
            this.price = price
            this.details = details


            this.appendTo= (destinationElement)=>{ 

                let  card = document.createElement('article')
                card.classList.add('card__article')
                card.addEventListener ('click', (e)=>{
                    e.preventDefault()
                    console.log(this);

                })
                
                destinationElement.appendChild(card)
            }
    }
        
    
    const cards = [ 
        new Card("samsung/galaxy-1.3.jpg","Galaxy Watch 1.3' ","$67.500", " Batería de hasta 7 días de duración / Reproductor MP3 / Operación a través del bisel giratorio"), 
        new Card("samsung/galaxy-4.jpg ","Galaxy Watch 4","$36.999", " Batería de hasta 7 días de duración / Reproductor MP3 / Operación a través del bisel giratorio"), 
        new Card("samsung/galaxy-pink.jpg ","Galaxy Watch 4 Pink","$38.999", " Batería de hasta 7 días de duración / Reproductor MP3 / Operación a través del bisel giratorio"), 
        new Card("samsung/galaxy-3.jpg","Galaxy Watch 3","$42.499", " Batería de hasta 7 días de duración / Reproductor MP3 / Operación a través del bisel giratorio"), 
        new Card("samsung/galaxy-active.jpg","Galaxy Watch Active 2","$35.990", " Batería de hasta 7 días de duración / Reproductor MP3 / Operación a través del bisel giratorio"), 
        new Card("samsung/galaxy-active2.jpg","Galaxy Watch Active","$32.999", " Batería de hasta 7 días de duración / Reproductor MP3 / Operación a través del bisel giratorio"), 
        new Card("apple/series-6.jpg","Apple Watch Series 6","$69.999", " Batería de hasta 7 días de duración / Reproductor MP3 / Operación a través del bisel giratorio"), 
        new Card("apple/series-6-red.jpg","Apple Watch Series 6 RED","$74.999", " Batería de hasta 7 días de duración / Reproductor MP3 / Operación a través del bisel giratorio"), 
        new Card("apple/watch-se.jpg","Apple Watch SE","$54.099"), 
        new Card("apple/series-5.jpg","Apple Watch Series 5", "$55.999"), 
        new Card("apple/watch-nike.jpg","Apple Watch Nike","$83.999"), 
        new Card("xiaomi/gtr.jpg","Amazfit T-Rex Pro","$17.949"), 
        new Card("xiaomi/gtr2.jpg","Amazfit GTR 2e","$17.299"), 
        new Card("xiaomi/gts2.jpg","Amazfit GTS 2 mini","$14.299"), 
        new Card("xiaomi/neo.jpg","Amazfit Neo","$11.299"), 
        new Card("xiaomi/bip-u.jpg","Amazfit Bip U","$7.549"), 
        new Card("garmin/f35.jpg","Garmin Forerunner 45","$32.999"), 
        new Card("garmin/enduro.png","Garmin Enduro","$148.999"), 
        new Card("garmin/945.jpg","Garmin Forerunner 925","$37.999"), 
        new Card("garmin/venu.png","Garmin VENU","$74.999"), 
        new Card("huawei/4e.jpg","Huawei Band 4","$19.630"), 
        new Card("huawei/gt2.jpg","Huawei Watch GT 2","$71.820"), 
        new Card("huawei/a2.jpg","Huawei Color Band A2","$10.099")
         ]
    
    
        const elemCardsContainer = document.querySelector('.cards-container')
        


        /* const cards =[
            card1,card2,card3,card4,card5,card6,card7,card8,card9,card10,card11,card12,card13,card14,card15,
            card16,card17,card18,card19,card20,card21,card22,card23
        ] */

        

    
        for (card of cards){
            card.appendTo(elemCardsContainer)
        }
    
 
    }


    