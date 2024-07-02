import Botao from '../../components/Botao'
import Estatisticas from '../../components/Estatisticas'
import styles from '../styles/Resultado.module.css'
import { useRouter } from "next/router"

export default function Resultado(){
    const router = useRouter()
    const total = router.query.total ? +router.query.total : 0
    const certas = router.query.certas ? +router.query.certas : 0
    const percentual = Math.round((certas/total)*100)
    return (
        <div className={styles.resultado}>
            <h1>Resultado Final</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Estatisticas texto='Perguntas' valor={total} />
                <Estatisticas texto='Certas' valor={certas}
                    corFundo='#9CD2A4' />
                <Estatisticas texto='Percentual' valor={`${percentual}%`}
                    corFundo='#DE6A33' />
            </div>
            <Botao href='/' texto='Reiniciar questionário' />
        </div>
    )
}