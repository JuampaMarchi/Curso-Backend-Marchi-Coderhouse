const importContainer = require('./script')

it ('readTest',async ()=>{
    let newContainer = new importContainer.Contenedor('./productos.json')
    let newProd = {
        "name": "producto4",
        "price": 40,
        "id": 4
    }
    let file = await newContainer.read()
    let arrayL = JSON.parse(file).length
    console.log(file)
    await newContainer.save(newProd)
    file = await newContainer.read()
    let arrayL2 = JSON.parse(file).length
    expect(arrayL2).toBe(arrayL+2)
    console.log(file)
})

