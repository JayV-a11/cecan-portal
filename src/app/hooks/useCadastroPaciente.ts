import axios from 'axios';
import { useState } from 'react';

type Status = 1 | 2 | 3 | 4 | 5;

interface CadastroPacienteResponse {
    sucesso: boolean;
    mensagem: string;
    id?: string; // Inclui o campo `id` caso seja retornado do servidor
}

const statusMap: { [key in Status]: string } = {
    1: 'ATIVO',
    2: 'AGUARDANDO PREENCHIMENTO',
    3: 'AGUARDANDO ASSINATURA',
    4: 'ASSINADO',
    5: 'ENCERRADO',
};

const useCadastroPaciente = () => {
    const [status, setStatus] = useState<string | null>(null);

    const cadastrarPaciente = async (
        nomePaciente: string,
        statusNumero: Status
    ): Promise<CadastroPacienteResponse> => {
        const status = statusMap[statusNumero];

        const userCredentials = localStorage.getItem('USER_CREDENTIALS');
        if (!userCredentials) {
            return { sucesso: false, mensagem: 'Usuário não autenticado' };
        }

        const { refreshToken } = JSON.parse(userCredentials);

        if (!refreshToken) {
            return {
                sucesso: false,
                mensagem: 'Token de autenticação inválido',
            };
        }

        setStatus(status);

        try {
            const response = await axios.post(
                'https://cecan-api.onrender.com/cadastro',
                {
                    nome_paciente: nomePaciente,
                    status,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${refreshToken}`, // Token no cabeçalho
                    },
                }
            );

            if (response.data && response.data) {
                return {
                    sucesso: true,
                    mensagem: 'Paciente cadastrado com sucesso!',
                    id: response.data[0].id, // Inclui o id caso esteja na resposta
                };
            } else {
                return {
                    sucesso: false,
                    mensagem:
                        response.data?.mensagem || 'Erro ao cadastrar paciente',
                };
            }
        } catch (error) {
            return { sucesso: false, mensagem: 'Erro ao conectar ao servidor' };
        }
    };

    const atualizaCadastrarPaciente = async (
        id: string,
        statusNumero: Status
    ): Promise<CadastroPacienteResponse> => {
        const status = statusMap[statusNumero];

        const userCredentials = localStorage.getItem('USER_CREDENTIALS');
        if (!userCredentials) {
            return { sucesso: false, mensagem: 'Usuário não autenticado' };
        }

        const { refreshToken } = JSON.parse(userCredentials);

        if (!refreshToken) {
            return {
                sucesso: false,
                mensagem: 'Token de autenticação inválido',
            };
        }

        setStatus(status);

        try {
            const response = await axios.patch(
                'https://cecan-api.onrender.com/cadastro',
                {
                    id,
                    status,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );

            if (response.data && response.data) {
                return {
                    sucesso: true,
                    mensagem: 'Paciente cadastrado com sucesso!',
                    id: response.data[0].id, // Inclui o id caso esteja na resposta
                };
            } else {
                return {
                    sucesso: false,
                    mensagem:
                        response.data?.mensagem || 'Erro ao cadastrar paciente',
                };
            }
        } catch (error) {
            return { sucesso: false, mensagem: 'Erro ao conectar ao servidor' };
        }
    };

    return { cadastrarPaciente, atualizaCadastrarPaciente, status };
};

export default useCadastroPaciente;
