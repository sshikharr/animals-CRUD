import express from "express"

const app = express();

app.use(express.json())

const PORT = 3000;


interface Animals {
    id: number,
    name: string,
}

let animals: Animals[] = [
    {id: 1, name: "Elephant"},
    {id: 2, name: "Tiger"}
]

app.get('/animal', (req: express.Request, res: express.Response)=>{
    res.status(200).json({
        animals
    })
})

app.post('/animal', (req: express.Request, res: express.Response)=>{
    const animalName = req.body.name
    const newAnimal: Animals = {
        id: animals.length+1,
        name: animalName
    }
    animals.push(newAnimal);
    res.status(201).json({
        newList: animals
    })
})

app.put('/animal/:id', (req: express.Request, res: express.Response)=>{
    const id = parseInt(req.params.id);
    const animal = animals.find(a=>a.id === id);
    if(animal){
        animal.name = req.body.name;
        res.status(200).json({
            newAnimal: animal
        })
    }else{
        res.status(404).json({
            message: "Couldn't find the animal"
        })
    }
})

app.delete('/animal/:id', (req: express.Request, res: express.Response)=>{
    const id = parseInt(req.params.id);
    animals = animals.filter(a=>a.id !== id);
    res.status(200).json({
        newList: animals
    })
})

app.listen(PORT, ()=>{
    console.log("Listening to port 3000")
})