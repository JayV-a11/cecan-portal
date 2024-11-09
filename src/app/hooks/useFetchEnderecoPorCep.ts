import axios from 'axios';

const useFetchEnderecoPorCep = () => {
    const fetchEnderecoPorCep = async (cep: string) => {
        try {
            const response = await axios.get(
                `https://viacep.com.br/ws/${cep}/json/`
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar endereço por CEP:', error);
            return null;
        }
    };

    return { fetchEnderecoPorCep };
};

export default useFetchEnderecoPorCep;
