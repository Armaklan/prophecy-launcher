import fastify from 'fastify'
import ws from 'fastify-websocket'
import { DommageResult, InitiativeResult, ProphecyResult, ProphecyTest, Randomizer } from './dicer'

const server = fastify()
server.register(ws)
const randomizer = new Randomizer()
const dicer = new ProphecyTest(randomizer)

interface DicerRequest {
  personnage: string
  image: string
  attribut?: string
  attributValue?: number
  competence?: string
  competenceValue?: number
  tendance?: boolean
  baseDommage?: number;
  nbDesDommage?: number;
  type: 'Test' | 'Dommage';
}

interface DicerResponse {
  type: 'Test' | 'Dommage';
  personnage: string
  image: string
  attribut: string
  competence: string
  resultats: ProphecyResult[] | DommageResult[]
}

interface InitiativeRequest {
  personnage: string
  image: string
  nbDes: number;
  type: 'Initiative';
}

interface InitiativeResponse {
  type: 'Initiative';
  personnage: string
  image: string
  resultats: InitiativeResult[]
}

server.post('/dicer', async (request, reply) => {
  const body = JSON.parse(request.body as string) as DicerRequest
  let result;
  
  if(body.type === 'Test') {
    result = dicer.test(body.attributValue, body.competenceValue, 0, body.tendance)
  }

  if (body.type === 'Dommage') {
    result = dicer.dommage(body.nbDesDommage, body.baseDommage);
  }

  const response: DicerResponse = {
    type: body.type,
    personnage: body.personnage,
    image: body.image,
    attribut: body.attribut,
    competence: body.competence,
    resultats: result
  }

  sendWsMessage(response);

  reply.send(response);
})

server.post('/initiative', async (request, reply) => {
  const body = JSON.parse(request.body as string) as InitiativeRequest
  const result = dicer.initiative(body.nbDes);

  const response: InitiativeResponse = {
    type: body.type,
    personnage: body.personnage,
    image: body.image,
    resultats: result
  }

  sendWsMessage(response);

  reply.send(response);
})

server.get('/', {websocket: true}, (connection, req) => {

})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

function sendWsMessage(message: any) {
  server.websocketServer.clients.forEach((client: any) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message));
    }
  })
}