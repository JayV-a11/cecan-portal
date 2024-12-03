import axios from 'axios';
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
            const response = await axios.post(
                'https://cecan-api.onrender.com/paciente',
                {
                    data,
                }
            );

            if (response.status >= 400) {
                throw new Error(`Erro ao salvar paciente`);
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
