import styles from '../src/styles/Questao.module.css'
import QuestaoModel from "../model/questao";
import Enunciado from './Enunciado';
import Resposta from './Resposta';
import Temporizador from './Temporizador';

const letras = [
    { valor: 'A', cor: '#F2C866' },
    { valor: 'B', cor: '#F266BA' },
    { valor: 'C', cor: '#85D4F2' },
    { valor: 'D', cor: '#BCE596' },
]

interface QuestaoProps {
    valor: QuestaoModel
    tempoDeResposta?: number
    respostaFornecida: (indice: number) => void
    tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps){
    const questao = props.valor
    
    function renderRespostas(){
        return questao.respostas.map(
            (resposta, i) => {
                return  <Resposta
                            key={`${questao.id}-${i}`}
                            indice={i}
                            valor={resposta}
                            letra={letras[i].valor}
                            corFundoLetra={letras[i].cor}
                            respostaFornecida={props.respostaFornecida}
                        />
            }
        )
    }

    return (
        <>
            <div className={styles.questao}>
                <Enunciado texto={questao?.enunciado} />
                <Temporizador
                    key={questao.id}
                    duracao={props.tempoDeResposta ?? 10}
                    tempoEsgotado={props.tempoEsgotado} />
                {renderRespostas()}
            </div>
        </>
    )
}