import questoes from '../bancoDeQuestoes'
export default function handler(req: any, res: any) {
    const id = +req.query.id
    const questao = questoes.filter(questao => questao.id === id)

    if(questao.length === 1){
        const questaoSelecionada = questao[0].embaralharRespostas()
        // const obj = questaoSelecionada.responder(0)
        res.status(200).json(
            questaoSelecionada.paraObjeto()
        );        
    }else{
        res.status(204).send()
    }
  }