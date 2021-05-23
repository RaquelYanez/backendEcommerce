const orders = [
    {
        //user: userId,
        orderProducts:[
            {
                name: 'CLASSICS LOGO HOODIE',
                image:'https://img01.ztat.net/article/spp-media-p1/71b007d22c0a356db51431a02f6a8f3d/fc7ab63565714061b060f5d69e2733f6.jpg?imwidth=762&filter=packshot',
                quantity:1,
                price:90.99,
                //product: ref:'Product'
            }
        ],
        shippingAddress:{
            address:'Direccion',
            city:'Vilaboa',
            cp:'15174',
            country:'Espana',
        },
        paymentMethod:'metalico',
        shippingPrice:0,
        totalPrice:90.99
    }


    ]

module.exports = orders;