import { useState } from 'react';
import { PacienteData } from '../types';

const useSalvarPaciente = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const salvarPaciente = async (data: PacienteData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const userCredentials = localStorage.getItem('USER_CREDENTIALS');
            const token = userCredentials
                ? JSON.parse(userCredentials).token
                : null;

            if (!token) {
                throw new Error('Token de autenticação não encontrado');
            }

            const response = await fetch('http://localhost:8080/paciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(
                    `Erro ao salvar paciente: ${response.statusText}`
                );
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    return { salvarPaciente, loading, error, success };
};

export default useSalvarPaciente;
