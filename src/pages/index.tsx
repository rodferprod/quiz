import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import QuestaoModel from "../../model/questao";
import { useEffect, useState } from "react";
import Questionario from "../../components/Questionario";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()

  const [questao, setQuestao] = useState<QuestaoModel>()
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  // Quando a questão é clicada a instância do componente Questão é alterada
  // trazendo os estilos atualizados (vermelho para a resposta errada, etc.)
  // Porém, quando o temporizador é finalizado, a questão clicada pelo usuário
  // perde o estilo, pois o temporizador está apontando para a instância inicial.
  // Para corrigir isso precisamos propagar a instância alterada para todo o escopo
  // da aplicação. Para isso usamos o Hook "useRef()" em conjunto com "useEffect()"

  // const questaoRef = useRef<QuestaoModel>()

  // Sempre que "questao" for alterada passamos para a propriedade "current" de useRef
  // a instância atualizada
  // useEffect(() => {
  //   questaoRef.current = questao
  // }, [questao])

  //function respostaFornecida(indice: number){
  //  console.log('indice: '+indice)
  // setQuestao(questaoRef.current.responder(indice))
  //  setQuestao(questao.responder(indice))
  //}

  //function tempoEsgotado(){
  // if(!questaoRef.current.respondida) setQuestao(questaoRef.current.responder(-1))
  //  if(!questao.respondida) setQuestao(questao.responder(-1))
  //}

  const BASE_URL = 'https://quiz-ochre-tau.vercel.app/api'

  async function carregaIdsQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregaQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const objQuestao = await resp.json()
    const modelQuestao = QuestaoModel.criarUsandoObjeto(objQuestao)
    setQuestao(modelQuestao)
  }

  useEffect(() => {
    carregaIdsQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregaQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaQuestao() {
    if(questao){
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
    }
  }

  function proximoPasso() {
    const proximoId = idProximaQuestao()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId: number){
    carregaQuestao(proximoId)
  }

  function finalizar(){
    router.push({
      pathname: '/resultado',
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return (
    <>
      <Head>
        <title>Questionário</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {questao ? 
          <Questionario
            questao={questao}
            ultimaQuestao={idProximaQuestao() === undefined}
            questaoRespondida={questaoRespondida}
            proximoPasso={proximoPasso}
          /> :
          false
        }
      </main>
    </>
  );
}
