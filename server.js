import express from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const app = express()
app.use(express.json())// imformaçoes em formato JSON


//const users = [] lista temporaria, agora o prisma faz isso pra mim e coloca os dados no mongo DB localmente

//criar usuarios BODY PARAMS
app.post('/usuarios',async (req, res) => {
    const users = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age:req.body.age
        }
    })// ira salvar na lista de users
    res.status(201).json(users)
})

//listar usuario BODY PARAMS
//listar usuario BODY PARAMS
app.get('/usuarios', async (req, res) => {
    let users = [];

    // QUERY PARAMS FILTRO
    if (req.query.name || req.query.email || req.query.age) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age ? Number(req.query.age) : undefined
            }
        });
    } else {
        users = await prisma.user.findMany();
    }

    res.status(200).json(users);
});

//editar cadastro ROUTE PARAMS
app.put('/usuarios/:id', async (req, res) => {
    const users = await prisma.user.update({
        where: {
          id: req.params.id  
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })// ira salvar na lista de users
    res.status(201).json(users)
    
})

//deletar cadastro ROUTE PARAMS
app.delete('/usuarios/:id', async (req, res) => {
    const users = await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })// ira salvar na lista de users
    res.status(200).json({ message: "Usuario deletado com sucesso!" })
})


app.listen(3000, () => {
    console.log('servidor rodando!!')
})

///rMwzr1UaYKi0Pgzi
//lucaspassos

