import styles from '../src/styles/Questionario.module.css'
import QuestaoModel from "../model/questao"
import Questao from './Questao'
import Botao from './Botao'

interface QuestionarioProps{
    questao: QuestaoModel
    ultimaQuestao: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    proximoPasso: () => void
}

export default function Questionario(props: QuestionarioProps){
    
    function respostaFornecida(indice: number){
        if(!props.questao.respondida){
            props.questaoRespondida(props.questao.responder(indice))
        }
    }
    return (
        <div className={styles.questionario}>
            {props.questao ? 
                <Questao
                    valor={props.questao}
                    tempoDeResposta={10}
                    respostaFornecida={respostaFornecida}
                    tempoEsgotado={props.proximoPasso} />
                : false
            }
            <Botao onClick={props.proximoPasso}
                texto={props.ultimaQuestao ? 'Finalizar' : 'Próxima'} />
        </div>
    )
}