import {
    Box,
    FormControlLabel,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface ContatoProps {
    onChange: (values: any) => void;
    forms?: any;
}

const Contato: React.FC<ContatoProps> = ({ onChange, forms }) => {
    const [possuiConvenio, setPossuiConvenio] = useState(false);
    const [formData, setFormData] = useState(
        forms ?? {
            telefoneFixo: '',
            celular: '',
            telefoneContato: '',
            nomeContato: '',
            parentescoContato: '',
            convenio: '',
        }
    );

    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

    const handleCelularChange = (e: any) => {
        let inputValue = e.target.value.replace(/\D/g, '');

        if (inputValue.length > 2) {
            inputValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2)}`;
        }
        if (inputValue.length > 10) {
            inputValue = `${inputValue.slice(0, 10)}-${inputValue.slice(10, 14)}`;
        }
        handleInputChange('celular', inputValue);
    };

    const handleInputChange = (field: string, value: string) => {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);
        onChange(updatedData);
    };

    const handleConvenioChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPossuiConvenio(event.target.checked);
        handleInputChange('convenio', event.target.checked ? '' : ''); // Limpa o campo se o convênio for desmarcado
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <TextField
                label="Telefone Fixo (opcional)"
                value={formData.telefoneFixo}
                onChange={(e) =>
                    handleInputChange('telefoneFixo', e.target.value)
                }
                inputProps={{ pattern: telefoneRegex.source }}
            />
            <TextField
                label="Celular"
                required
                value={formData.celular}
                onChange={handleCelularChange}
                inputProps={{ pattern: telefoneRegex.source }}
            />
            <Typography variant="h6">Telefone Contato</Typography>
            <TextField
                label="Telefone Contato"
                value={formData.telefoneContato}
                onChange={(e) =>
                    handleInputChange('telefoneContato', e.target.value)
                }
                inputProps={{ pattern: telefoneRegex.source }}
                required
            />
            <TextField
                label="Nome do Contato"
                value={formData.nomeContato}
                onChange={(e) =>
                    handleInputChange('nomeContato', e.target.value)
                }
                required
            />
            <TextField
                label="Parentesco do Contato"
                value={formData.parentescoContato}
                onChange={(e) =>
                    handleInputChange('parentescoContato', e.target.value)
                }
                required
            />

            {/* Divisão Convênio */}
            <Typography variant="h6">Convênio</Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={possuiConvenio}
                        onChange={handleConvenioChange}
                    />
                }
                label="Possui convênio médico?"
            />
            {possuiConvenio && (
                <TextField
                    label="Qual convênio?"
                    value={formData.convenio}
                    onChange={(e) =>
                        handleInputChange('convenio', e.target.value)
                    }
                    required
                />
            )}
        </Box>
    );
};

export default Contato;
