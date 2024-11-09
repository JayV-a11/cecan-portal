import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface Filiacao {
    id: number;
    nome: string;
    genero: 'masculino' | 'feminino';
}

interface FiliacoesProps {
    onChange: (filiacoes: Filiacao[]) => void;
    forms?: any;
}

const Filiacoes: React.FC<FiliacoesProps> = ({ onChange, forms }) => {
    const [filiacoes, setFiliacoes] = useState<Filiacao[]>(forms ?? []);

    const handleAddFiliacao = () => {
        const newFiliacao: Filiacao = {
            id: Date.now(),
            nome: '',
            genero: 'masculino',
        };
        setFiliacoes((prev) => [...prev, newFiliacao]);
    };

    const handleFiliacaoChange = (
        id: number,
        field: keyof Filiacao,
        value: string
    ) => {
        const updatedFiliacoes = filiacoes.map((filiacao) =>
            filiacao.id === id ? { ...filiacao, [field]: value } : filiacao
        );
        setFiliacoes(updatedFiliacoes);
        onChange(updatedFiliacoes);
    };

    const handleRemoveFiliacao = (id: number) => {
        const updatedFiliacoes = filiacoes.filter(
            (filiacao) => filiacao.id !== id
        );
        setFiliacoes(updatedFiliacoes);
        onChange(updatedFiliacoes);
    };

    return (
        <Box>
            {filiacoes.map((filiacao) => (
                <Box
                    key={filiacao.id}
                    display="flex"
                    alignItems="center"
                    mb={2}
                >
                    <TextField
                        label="Nome"
                        value={filiacao.nome}
                        onChange={(e) =>
                            handleFiliacaoChange(
                                filiacao.id,
                                'nome',
                                e.target.value
                            )
                        }
                        variant="outlined"
                        sx={{ mr: 2 }}
                    />
                    <FormControl
                        variant="outlined"
                        sx={{ mr: 2, minWidth: 120 }}
                    >
                        <InputLabel>Gênero</InputLabel>
                        <Select
                            value={filiacao.genero}
                            onChange={(e) =>
                                handleFiliacaoChange(
                                    filiacao.id,
                                    'genero',
                                    e.target.value as 'masculino' | 'feminino'
                                )
                            }
                            label="Gênero"
                        >
                            <MenuItem value="masculino">Masculino</MenuItem>
                            <MenuItem value="feminino">Feminino</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton
                        onClick={() => handleRemoveFiliacao(filiacao.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={handleAddFiliacao}
            >
                Adicionar Filiação
            </Button>
        </Box>
    );
};

export default Filiacoes;
