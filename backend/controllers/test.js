

exports.testing = async (req, res) => {

    let arry = [
        {
          deleted: false,
          
          title: 'green mangos',
          slug: 'green-mangos',
          description: 'very tasty and goes well with chilli',
          price: 5,
          category: {
         
            name: 'vegetable',
            slug: 'vegetable',
         
            __v: 0
          },
          subcategories: [ [Object] ],
          quantity: 100,
          sold: 0,
          images: [ [Object], [Object] ],
          shipping: 'Yes',
          color: 'Red',
          brand: 'Green mango',
          ratings: [],
       
          __v: 0
        },
        {
          deleted: false,
       
          title: 'Avo',
          slug: 'avo',
          description: 'Very good and special',
          price: 2,
          category: {
          
            name: 'vegetable',
            slug: 'vegetable',
        
            __v: 0
          },
          subcategories: [],
          quantity: 30,
          sold: 0,
          images: [ [Object], [Object], [Object] ],
          shipping: 'Yes',
          color: 'Red',
          brand: 'Avocado',
          ratings: [],
        
          __v: 0
        },
        {
          deleted: false,
       
          title: 'red apples',
          slug: 'red-apples',
          description: 'A medium apple — with a diameter of about 3 inches (7.6 centimeters) — equals 1.5 cups of fruit. Two cups of fruit daily are recommended on a 2,000-calorie diet.', 
          price: 3,
          category: null,
          subcategories: [ [Object] ],
          quantity: 30,
          sold: 0,
          images: [ [Object] ],
          shipping: 'No',
          color: 'Red',
          brand: 'apple',
          ratings: [ [Object], [Object] ],
       
          __v: 0
        },
        {
          deleted: true,
    
          title: 'All-In-One Cooker HD2238/72',
          slug: 'all-in-one-cooker-hd223872',
          description: 'Effortless and 35%* faster cooking\n' +
            '\n' +
            'With superior heating power and 20 pre-set cooking programs, the 8L AIO cooker offers you effortless and faster cooking, so that you and your family are able to enjoy delicious meal even sooner!',
          price: 349,
          category: {
  
            name: 'kitchenwares',
            slug: 'kitchenwares',
         
            __v: 0
          },
          subcategories: [ [Object] ],
          quantity: 0,
          sold: 1,
          images: [ [Object], [Object], [Object], [Object] ],
          shipping: 'No',
          color: 'Brown',
          brand: 'PHILIPS',
         
          __v: 0,
          ratings: [ [Object], [Object] ]
        }
      ]
    let newArry = arry.filter(x => x.deleted === false)
     res.json(newArry)
}
