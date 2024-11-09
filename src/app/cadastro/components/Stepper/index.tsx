'use client';
import useCadastroPaciente from '@/app/hooks/useCadastroPaciente';
import useSalvarPaciente from '@/app/hooks/useSalvarPaciente';
import {
    AtividadeForm,
    CondicaoForm,
    ContatoForm,
    DadosForm,
    EnderecoForm,
    PerfilPessoalForm,
    QuadroClinicoForm,
} from '@/app/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as React from 'react';
import { toast } from 'react-toastify';
import footerPDF from '../../../../../public/images/footerpdf.png';
import teste from '../../../../../public/images/headerpdf.png';
import Atividades from '../Atividades';
import CondicaoSocioeconomica from '../CondicaoSocioeconomica';
import Contato from '../Contato';
import Dados from '../Dados';
import Endereco from '../Endereco';
import Filiacoes from '../Filiacoes';
import PerfilPessoal from '../PerfilPessoal';
import QuadroClinico from '../QuadroClinico';

const steps = [
    'Dados',
    'Filiação',
    'Endereço',
    'Contato',
    'Perfil Pessoal',
    'Quadro Cliníco',
    'Condicao Socioeconomica',
    'Atividades',
    'Finalizar',
];

export default function Stepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [dadosForm, setDadosForm] = React.useState<DadosForm>();
    const [filiacaoForm, setFiliacaoForm] = React.useState([]);
    const [enderecoForm, setEnderecoForm] = React.useState<EnderecoForm>();
    const [contatoForm, setContatoForm] = React.useState<ContatoForm>();
    const [perfilPessoalForm, setPerfilPessoalForm] =
        React.useState<PerfilPessoalForm>();
    const [quadroClinico, setQuadroClinico] =
        React.useState<QuadroClinicoForm>();
    const [condicao, setCondicao] = React.useState<CondicaoForm>();
    const [atividade, setAtividade] = React.useState<AtividadeForm>();
    const [invalidId, setInvalidId] = React.useState(false);
    const [status, setStatus] = React.useState();
    const [selectedDoc, setSelectedDoc] = React.useState();
    const { salvarPaciente } = useSalvarPaciente();
    const { atualizaCadastrarPaciente } = useCadastroPaciente();
    const searchParams = useSearchParams();
    const router = useRouter();

    const generatePDF = async () => {
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const fontSize = 12;
        const pageWidth = 600;
        let page = pdfDoc.addPage([600, 800]);
        let y = 750;
        const imageUrl = teste;
        const imageBytes = await fetch(imageUrl.src).then((res) =>
            res.arrayBuffer()
        );
        const image = await pdfDoc.embedPng(imageBytes);

        const addHeader = () => {
            const imageWidth = 600;
            const imageHeight = 130;
            page.drawImage(image, {
                x: 10,
                y: y - imageHeight,
                width: imageWidth,
                height: imageHeight,
            });

            y -= 150;
            page.drawText(`Data: ${new Date().toLocaleDateString()}`, {
                x: 50,
                y,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });
            y -= 40;
        };

        const addFooter = () => {
            page.drawText(
                'Esse atendimento é feito aos usuários do SUS de forma gratuita',
                {
                    x: 50,
                    y: 60,
                    size: 11,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                }
            );
        };

        const checkPageLimit = () => {
            if (y < 70) {
                addFooter();
                page = pdfDoc.addPage([600, 800]);
                y = 750;
                addHeader();
            }
        };

        addHeader();

        const formData = [
            { label: 'Dados', data: dadosForm },
            { label: 'Filiação', data: filiacaoForm },
            { label: 'Endereço', data: enderecoForm },
            { label: 'Contato', data: contatoForm },
            { label: 'Perfil Pessoal', data: perfilPessoalForm },
            { label: 'Quadro Clínico', data: quadroClinico },
            { label: 'Condição Socioeconômica', data: condicao },
            { label: 'Atividades', data: atividade },
        ];

        const splitText = (
            text: string,
            maxWidth: number,
            font: any,
            fontSize: number
        ) => {
            const words = text.split(' ');
            let line = '';
            const lines = [];

            words.forEach((word) => {
                const testLine = line ? `${line} ${word}` : word;
                const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
                if (lineWidth > maxWidth) {
                    lines.push(line);
                    line = word;
                } else {
                    line = testLine;
                }
            });

            lines.push(line);
            return lines;
        };

        const addText = (text: string) => {
            const lines = splitText(
                text,
                pageWidth - 100,
                timesRomanFont,
                fontSize
            );
            lines.forEach((line) => {
                page.drawText(line, {
                    x: 50,
                    y,
                    size: fontSize,
                    font: timesRomanFont,
                });
                y -= 20;
                checkPageLimit();
            });
        };

        formData.forEach((section) => {
            page.drawText(section.label, {
                x: 50,
                y,
                size: fontSize + 2,
                font: timesRomanFont,
            });
            y -= 20;
            checkPageLimit();

            if (section.label === 'Filiação') {
                if (Array.isArray(section.data) && section.data?.length > 0)
                    section.data.forEach((filiacao: any) => {
                        addText(
                            `Nome: ${filiacao.nome}, Genêro: ${filiacao.genero}`
                        );
                    });
            } else if (section.data)
                Object.entries(section.data).forEach(([key, value]) => {
                    if (key === 'composicaoFamiliar') {
                        Array.isArray(value) &&
                            value.forEach((comp) => {
                                addText(
                                    `vinculo: ${comp.vinculo}, data de nascimento: ${comp.dataNascimento}, escolaridade: ${comp.escolaridade}, ocupação: ${comp.ocupacao}, renda: ${comp.renda}, vinculo: ${comp.vinculo}`
                                );
                            });
                    } else {
                        addText(`${key}: ${value}`);
                    }
                });

            y -= 20;
            checkPageLimit();
        });

        page = pdfDoc.addPage([600, 800]);
        const image2Url = footerPDF;
        const image2Bytes = await fetch(image2Url.src).then((res) =>
            res.arrayBuffer()
        );
        const image2 = await pdfDoc.embedPng(image2Bytes);
        const imageWidth = 570;
        const imageHeight = 350;
        page.drawImage(image2, {
            x: 10,
            y: 750 - imageHeight,
            width: imageWidth,
            height: imageHeight,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const search = searchParams.get('id');
        const fileFormData = new FormData();
        if (!search) {
            setInvalidId(true);
            return;
        }
        fileFormData.append('filename', blob, `dados_${search}.pdf`);

        try {
            const response = await axios.post(
                'http://localhost:8080/file',
                fileFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `dados_${search}.pdf`;
                link.click();
            } else {
                console.error('Falha no upload do arquivo.');
            }
        } catch (error) {
            console.error('Erro ao enviar o arquivo:', error);
        }
    };

    const handleSave = async () => {
        toast.promise(
            async () => {
                const id = searchParams.get('id');
                if (!id) {
                    toast.error(
                        'Não foi possivel indentificar o cadastro do cliente'
                    );
                    return;
                }
                const data = {
                    paciente: {
                        nome: dadosForm?.nome ?? '-',
                        rg: dadosForm?.rg ?? '-',
                        cpf: dadosForm?.cpf ?? '-',
                        nascimento: dadosForm?.dataNascimento ?? '-',
                        sus: dadosForm?.cartaoSus ?? '-',
                        convenio: dadosForm?.convenio === 'sim',
                        estado_civil: perfilPessoalForm?.estadoCivil ?? '-',
                        escolaridade: perfilPessoalForm?.escolaridade ?? '-',
                        contato: contatoForm?.celular ?? '-',
                        atividade: atividade?.interesseAtividades ?? '-',
                        codigo: id,
                    },
                    endereco: {
                        cep: enderecoForm?.cep ?? '-',
                        rua: enderecoForm?.rua ?? '-',
                        numero: enderecoForm?.numero ?? '-',
                        cidade: enderecoForm?.cidade ?? '-',
                        bairro: enderecoForm?.bairro ?? '-',
                        estado: enderecoForm?.estado ?? '-',
                        complemento: enderecoForm?.estado ?? '-',
                    },
                    quadroClinico: {
                        recidiva: quadroClinico?.recidiva === 'sim',
                        metastase: quadroClinico?.metastase === 'sim',
                        realizou_cirurgia:
                            quadroClinico?.realizouCirurgia === 'sim',
                        realiza_exames_prevencao:
                            quadroClinico?.recidiva === 'sim',
                        realiza_tratamento_outras_doencas:
                            quadroClinico?.tratamentoOutraDoenca === 'sim',
                        local_tratamento:
                            quadroClinico?.localTratamentoOutraDoenca ?? '-',
                        medico_responsavel:
                            quadroClinico?.medicoResponsavel ?? '-',
                        data_diagnostico: quadroClinico?.dataDiagnostico
                            ? new Date(quadroClinico?.dataDiagnostico)
                            : new Date(),
                    },
                    sitSocieconomica: {
                        recebe_beneficio: condicao?.recebeBeneficio === 'sim',
                        aposentado: condicao?.aposentado === 'sim',
                        desempregado: condicao?.desempregado === 'sim',
                        moradia: condicao?.moradia ?? '-',
                        renda_per_capita: condicao?.rendaPerCapita ?? '-',
                    },
                };

                const search = searchParams.get('id');
                if (!search) {
                    setInvalidId(true);
                    return;
                }
                await salvarPaciente(data as any);
                await atualizaCadastrarPaciente(search, 3);
                await generatePDF();
                router.refresh();
            },
            {
                error: 'Houve um erro ao salvar seus dados, tente novamente mais tarde',
                success: 'Dados salvos com sucesso!',
                pending: 'Seu documento está sendo gerado, aguarde um momento',
            }
        );
    };

    const downloadDocument = async () => {
        const id = searchParams.get('id');
        if (!id) {
            setInvalidId(true);
            return;
        }

        await axios
            .get(`http://localhost:8080/file?id=${id}`, {
                responseType: 'blob',
            })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `dados_${id}.pdf`);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.log('Erro ao baixar o arquivo:', error);
            });
    };

    const selectDocument = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*, .pdf'; // Aceita todos os tipos de imagem e arquivos PDF
        input.onchange = async () => {
            if (!input.files) return;
            const file = input.files[0];
            setSelectedDoc(file as any);
        };
        input.click();
    };

    const getFileExtension = (
        mimeType: keyof {
            'image/jpeg': string;
            'image/png': string;
            'image/jpg': string;
            'application/pdf': string;
        }
    ) => {
        const mimeToExtension = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/jpg': 'png',
            'application/pdf': 'pdf',
        };

        return mimeToExtension[mimeType] || 'unknown';
    };

    const sendDocument = async () => {
        const id = searchParams.get('id');
        if (!id) {
            setInvalidId(true);
            return;
        }

        if (!selectedDoc) return;
        const docfile = selectedDoc as any;
        const fileFormData = new FormData();
        fileFormData.append(
            'filename',
            selectedDoc,
            `dados_${id}_assinado.${getFileExtension(docfile.type)}`
        );
        toast.promise(
            async () => {
                await axios
                    .post('http://localhost:8080/file', fileFormData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(async (res) => {
                        if (res.status === 200) {
                            await atualizaCadastrarPaciente(id, 4);
                            toast.success(
                                'Arquivo enviado com sucesso! Entre em contato com a equipe da CECAN'
                            );
                            router.refresh();
                        }
                    })
                    .catch((err) =>
                        toast.error(
                            'houve um erro ao enviar o arquivo, tente novamente mais tarde'
                        )
                    );
            },
            {
                pending: 'Enviando imagem',
            }
        );
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleDadosChange = (values: any) => setDadosForm(values);

    const handleFiliacaoChange = (values: any) => setFiliacaoForm(values);

    const handleEnderecoChange = (values: any) => setEnderecoForm(values);

    const handleContatoChange = (values: any) => setContatoForm(values);

    const handlePerfilPessoalChange = (values: any) =>
        setPerfilPessoalForm(values);

    const handleQuadroClinicoChange = (values: any) => setQuadroClinico(values);

    const handleChangeCondicao = (values: any) => setCondicao(values);

    const handleChangeAtividade = (values: any) => setAtividade(values);

    const loadInfo = async () => {
        try {
            const search = searchParams.get('id');
            if (!search) setInvalidId(true);

            const response = await axios.get(
                `http://localhost:8080/cadastro/${search}`
            );

            if (response.status === 200) {
                setStatus(response.data.status);
            }
        } catch (err) {
            setInvalidId(true);
            return;
        }
    };

    React.useEffect(() => {
        loadInfo();
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            {status === 'AGUARDANDO PREENCHIMENTO' && (
                <div className="headerlabel">
                    <span>{steps[activeStep]}</span>
                    <div className="customLine" />
                </div>
            )}

            <React.Fragment>
                <Box className="cadastroContainer" sx={{ mt: 2, mb: 1 }}>
                    {invalidId ? (
                        <div className="mensagemStatus">
                            Não foi possivel encontrar o seu formulário de
                            cadastro, entre em contato com a equipe de suporte
                        </div>
                    ) : status === 'AGUARDANDO PREENCHIMENTO' ? (
                        <>
                            {activeStep === 0 && (
                                <Dados
                                    forms={dadosForm}
                                    onChange={handleDadosChange}
                                />
                            )}
                            {activeStep === 1 && (
                                <Filiacoes
                                    forms={filiacaoForm}
                                    onChange={handleFiliacaoChange}
                                />
                            )}
                            {activeStep === 2 && (
                                <Endereco
                                    forms={enderecoForm}
                                    onChange={handleEnderecoChange}
                                />
                            )}
                            {activeStep === 3 && (
                                <Contato
                                    forms={contatoForm}
                                    onChange={handleContatoChange}
                                />
                            )}
                            {activeStep === 4 && (
                                <PerfilPessoal
                                    forms={perfilPessoalForm}
                                    onChange={handlePerfilPessoalChange}
                                />
                            )}
                            {activeStep === 5 && (
                                <QuadroClinico
                                    forms={quadroClinico}
                                    onChange={handleQuadroClinicoChange}
                                />
                            )}
                            {activeStep === 6 && (
                                <CondicaoSocioeconomica
                                    forms={condicao}
                                    onChange={handleChangeCondicao}
                                />
                            )}
                            {activeStep === 7 && (
                                <Atividades
                                    forms={atividade}
                                    onChange={handleChangeAtividade}
                                />
                            )}
                            {activeStep === 8 && (
                                <div className="mensagemStatus center">
                                    Tem certeza de que todos os dados estão
                                    corretos? Ao finalizar o preenchimento do
                                    formulário não será possivel modificar as
                                    informações desse cadastro
                                </div>
                            )}
                        </>
                    ) : status === 'ASSINADO' || status === 'ATIVO' ? (
                        <div className="mensagemStatus center">
                            Você ja enviou o documento assinado! Entre em
                            contato com a equipe da CECAN para entender os
                            próximos passos
                        </div>
                    ) : (
                        status === 'AGUARDANDO ASSINATURA' && (
                            <div className="mensagemStatus rows">
                                Cadastro já preenchido. Por favor, envie o
                                documento assinado
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={downloadDocument}
                                    sx={{ mr: 1 }}
                                >
                                    Baixar documento não assinado
                                </Button>
                                {selectedDoc && (
                                    <span>{`Arquivo selecionado: ${(selectedDoc as { name: string }).name}`}</span>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={selectDocument}
                                    sx={{ mr: 1 }}
                                >
                                    {selectedDoc
                                        ? 'Selecionar outro arquivo'
                                        : 'Selecionar doumento assinado'}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!selectedDoc}
                                    onClick={sendDocument}
                                    sx={{ mr: 1 }}
                                >
                                    Enviar arquivo
                                </Button>
                            </div>
                        )
                    )}
                </Box>
                {status === 'AGUARDANDO PREENCHIMENTO' && (
                    <Box
                        className="footer"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Voltar
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                activeStep === steps.length - 1
                                    ? handleSave()
                                    : handleNext()
                            }
                            disabled={activeStep > steps.length - 1}
                        >
                            {activeStep === steps.length - 1
                                ? 'Finalizar'
                                : 'Próximo'}
                        </Button>
                    </Box>
                )}
            </React.Fragment>
        </Box>
    );
}
