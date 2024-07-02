import QuestaoModel from "../../../model/questao";
import RespostaModel from "../../../model/responta";

const questoes: QuestaoModel[] = [
    new QuestaoModel(
        201,
        'Qual bicho transmite a doença de chagas?',
        [
            RespostaModel.errada('Abelha'),
            RespostaModel.errada('Barata'),
            RespostaModel.errada('Pulga'),
            RespostaModel.certa('Barbeiro'),
        ]
    ),
    new QuestaoModel(
        202,
        'Qual fruto é conhecido no Norte e Nordeste como "jerimum"?',
        [
            RespostaModel.errada('Cajú'),
            RespostaModel.errada('Côco'),
            RespostaModel.errada('Chuchu'),
            RespostaModel.certa('Abóbora'),
        ]
    ),
    new QuestaoModel(
        203,
        'Qual o coletivo de cães?',
        [
            RespostaModel.errada('Manada'),
            RespostaModel.errada('Alcatéia'),
            RespostaModel.errada('Rebanho'),
            RespostaModel.certa('Matilha'),
        ]
    ),
    new QuestaoModel(
        204,
        'Qual triângulo possui todos os lados diferentes?',
        [
            RespostaModel.errada('Equilátero'),
            RespostaModel.errada('Isóceles'),
            RespostaModel.errada('Trapézio'),
            RespostaModel.certa('Escaleno'),
        ]
    )
]

export default questoes