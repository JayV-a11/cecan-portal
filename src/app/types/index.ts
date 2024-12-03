export type DadosForm = {
    convenio: string;
    cartaoSus: string;
    dataNascimento: string;
    cpf: string;
    rg: string;
    nome: string;
};

export type PerfilPessoalForm = {
    escolaridade: string;
    estadoCivil: string;
};

export type ContatoForm = {
    celular: string;
};

export type EnderecoForm = {
    bairro: string;
    estado: string;
    cidade: string;
    numero: string;
    rua: string;
    cep: string;
};

export type AtividadeForm = {
    interesseAtividades: string;
};

export type QuadroClinicoForm = {
    dataDiagnostico: string | number | Date;
    medicoResponsavel: string;
    localTratamentoOutraDoenca: string;
    tratamentoOutraDoenca: string;
    examesPrevencao: string;
    localTratamento: string;
    realizouCirurgia: string;
    metastase: string;
    recidiva: string;
};

export type CondicaoForm = {
    rendaPerCapita: string;
    moradia: string;
    desempregado: string;
    aposentado: string;
    recebeBeneficio: string;
};

export type PacienteData = {
    paciente: {
        nome: string;
        rg: string;
        cpf: string;
        nascimento: string;
        sus: string;
        convenio: boolean;
        estado_civil: string;
        escolaridade: string;
        outro_contato: string;
        parentesco: string;
    };
    endereco: {
        cep: string;
        rua: string;
        numero: string;
        cidade: string;
        bairro: string;
        estado: string;
        complemento: string;
    };
    quadroClinico: {
        recidiva: boolean;
        metastase: boolean;
        realizou_cirurgia: boolean;
        realiza_exames_prevencao: boolean;
        realiza_tratamento_outras_doencas: boolean;
        local_tratamento: string;
        medico_responsavel: string;
        data_diagnostico: string;
    };
    sitSocieconomica: {
        recebe_beneficio: boolean;
        aposentado: boolean;
        desempregado: boolean;
        moradia: string;
        apoio: string;
        renda_per_capita: string;
    };
};
