import { randomUUID } from "crypto"


export class DatabaseMemory{
    #locadoras = new Map()

list(search){
    return Array.from(this.#locadoras.entries()).map((locadoraArray) => {
        const id = locadoraArray[0]

        const data = locadoraArray[1]

        return{
            id,
            ...data,
        }
        
    })
    .filter(locadora => {
        if (search){
        return locadora.nome.includes(search)
        }
        return true
    })
}

    create(locadora){
        const locadoraId = randomUUID()
        this.#locadoras.set(locadoraId, locadora)
    }
    
    update(id, locadora){
        this.#locadoras.set(id, locadora)
    }

    delete(id, locadora){
        this.#locadoras.delete(id, locadora)
    }
}