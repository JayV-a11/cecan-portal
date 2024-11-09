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
            telefoneProprio: '',
            telefoneFixo: '',
            celular: '',
            whatsapp: '',
            telefoneContato: '',
            nomeContato: '',
            parentescoContato: '',
            convenio: '',
        }
    );

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

    const telefoneRegex = /^[0-9-()]+$/;

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {/* Divisão Telefone Próprio */}
            <Typography variant="h6">Telefone Próprio</Typography>
            <TextField
                label="Telefone Próprio"
                value={formData.telefoneProprio}
                onChange={(e) =>
                    handleInputChange('telefoneProprio', e.target.value)
                }
                inputProps={{ pattern: telefoneRegex.source }}
                required
            />
            <TextField
                label="Telefone Fixo (opcional)"
                value={formData.telefoneFixo}
                onChange={(e) =>
                    handleInputChange('telefoneFixo', e.target.value)
                }
                inputProps={{ pattern: telefoneRegex.source }}
            />
            <TextField
                label="Celular (opcional)"
                value={formData.celular}
                onChange={(e) => handleInputChange('celular', e.target.value)}
                inputProps={{ pattern: telefoneRegex.source }}
            />
            <TextField
                label="WhatsApp (opcional)"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                inputProps={{ pattern: telefoneRegex.source }}
            />

            {/* Divisão Telefone Contato */}
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
