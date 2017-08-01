var GoogleImages = require('google-images');
 
var client = new GoogleImages('014302329711232858745:kmu70nd-fok', 'AIzaSyBclnF5fngJWo6yb1A_FQvu6giC7YpSraY');
 
client.search('Steve Angello')
    .then(images => {
        
        [{
            "url": "http://steveangello.com/boss.jpg",
            "type": "image/jpeg",
            "width": 1024,
            "height": 768,
            "size": 102451,
            "thumbnail": {
                "url": "http://steveangello.com/thumbnail.jpg",
                "width": 512,
                "height": 512
            }
        }]
         
    });
 
// paginate results 
client.search('Steve Angello', {page: 2});
 
// search for certain size 
client.search('Steve Angello', {size: 'large'});