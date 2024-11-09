import { Autocomplete, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import useFetchEnderecoPorCep from '../../../hooks/useFetchEnderecoPorCep';

interface EnderecoProps {
    onChange: (endereco: EnderecoData) => void;
    forms?: any;
}

interface EnderecoData {
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    estado: string;
    cidade: string;
}

const estados = [
    { label: 'Acre', code: 'AC' },
    { label: 'Alagoas', code: 'AL' },
    { label: 'Amapá', code: 'AP' },
    { label: 'Amazonas', code: 'AM' },
    { label: 'Bahia', code: 'BA' },
    { label: 'Ceará', code: 'CE' },
    { label: 'Distrito Federal', code: 'DF' },
    { label: 'Espírito Santo', code: 'ES' },
    { label: 'Goiás', code: 'GO' },
    { label: 'Maranhão', code: 'MA' },
    { label: 'Mato Grosso', code: 'MT' },
    { label: 'Mato Grosso do Sul', code: 'MS' },
    { label: 'Minas Gerais', code: 'MG' },
    { label: 'Pará', code: 'PA' },
    { label: 'Paraíba', code: 'PB' },
    { label: 'Paraná', code: 'PR' },
    { label: 'Pernambuco', code: 'PE' },
    { label: 'Piauí', code: 'PI' },
    { label: 'Rio de Janeiro', code: 'RJ' },
    { label: 'Rio Grande do Norte', code: 'RN' },
    { label: 'Rio Grande do Sul', code: 'RS' },
    { label: 'Rondônia', code: 'RO' },
    { label: 'Roraima', code: 'RR' },
    { label: 'Santa Catarina', code: 'SC' },
    { label: 'São Paulo', code: 'SP' },
    { label: 'Sergipe', code: 'SE' },
    { label: 'Tocantins', code: 'TO' },
];

const Endereco: React.FC<EnderecoProps> = ({ onChange, forms }) => {
    const [endereco, setEndereco] = useState<EnderecoData>(
        forms ?? {
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            estado: '',
            cidade: '',
        }
    );

    const { fetchEnderecoPorCep } = useFetchEnderecoPorCep();

    const handleInputChange = (field: keyof EnderecoData, value: string) => {
        const newEndereco = { ...endereco, [field]: value };
        setEndereco(newEndereco);
        onChange(newEndereco);
    };

    const handleCepBlur = async () => {
        if (endereco.cep.length === 8) {
            const data = await fetchEnderecoPorCep(endereco.cep);
            if (data) {
                setEndereco({
                    ...endereco,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    estado: data.uf,
                    cidade: data.localidade,
                });
            }
        }
    };

    const handleEstadoChange = (
        event: any,
        newValue: { label: string; code: string } | null
    ) => {
        if (newValue) {
            handleInputChange('estado', newValue.code);
        } else {
            handleInputChange('estado', '');
            handleInputChange('cidade', '');
        }
    };

    return (
        <Box>
            <TextField
                label="CEP"
                value={endereco.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                onBlur={handleCepBlur}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Rua"
                value={endereco.rua}
                onChange={(e) => handleInputChange('rua', e.target.value)}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Número"
                value={endereco.numero}
                onChange={(e) => handleInputChange('numero', e.target.value)}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Complemento"
                value={endereco.complemento}
                onChange={(e) =>
                    handleInputChange('complemento', e.target.value)
                }
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Bairro"
                value={endereco.bairro}
                onChange={(e) => handleInputChange('bairro', e.target.value)}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Cidade"
                value={endereco.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            <Autocomplete
                options={estados}
                getOptionLabel={(option) => option.label}
                onChange={handleEstadoChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Estado"
                        required
                        fullWidth
                        margin="normal"
                    />
                )}
            />
        </Box>
    );
};

export default Endereco;
