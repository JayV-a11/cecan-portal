import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface AtividadesProps {
    onChange: (values: any) => void;
    forms?: any;
}

const Atividades: React.FC<AtividadesProps> = ({ onChange, forms }) => {
    const [formData, setFormData] = useState(
        forms ?? {
            interesseAtividades: '',
            orientadoGratuidade: '',
            observacoes: '',
            sobreTratamento: '',
            modalidadeAtendimento: '',
        }
    );

    const atividades = [
        'Acupuntura',
        'Psicoterapia',
        'Massoterapia',
        'Terapia Ocupacional',
        'Meditação',
        'Yoga',
        'Natação',
        'Arteterapia',
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        onChange(formData);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Atividades</Typography>

            {/* Interesse em Atividades */}
            <FormControl>
                <InputLabel>Interesse em atividades</InputLabel>
                <Select
                    value={formData.interesseAtividades}
                    onChange={(e) =>
                        handleInputChange('interesseAtividades', e.target.value)
                    }
                >
                    {atividades.map((atividade, index) => (
                        <MenuItem key={index} value={atividade}>
                            {atividade}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Orientado quanto à gratuidade dos serviços */}
            <FormControl>
                <FormLabel>
                    Orientada quanto a gratuidade dos serviços prestados pelo
                    Cecan
                </FormLabel>
                <RadioGroup
                    row
                    value={formData.orientadoGratuidade}
                    onChange={(e) =>
                        handleInputChange('orientadoGratuidade', e.target.value)
                    }
                >
                    <FormControlLabel
                        value="sim"
                        control={<Radio />}
                        label="Sim"
                    />
                    <FormControlLabel
                        value="nao"
                        control={<Radio />}
                        label="Não"
                    />
                </RadioGroup>
            </FormControl>

            {/* Observações */}
            <TextField
                label="Observações"
                multiline
                rows={4}
                value={formData.observacoes}
                onChange={(e) =>
                    handleInputChange('observacoes', e.target.value)
                }
            />

            {/* Sobre o tratamento */}
            <FormControl>
                <FormLabel>Sobre o tratamento</FormLabel>
                <RadioGroup
                    row
                    value={formData.sobreTratamento}
                    onChange={(e) =>
                        handleInputChange('sobreTratamento', e.target.value)
                    }
                >
                    <FormControlLabel
                        value="tratamento"
                        control={<Radio />}
                        label="Tratamento"
                    />
                    <FormControlLabel
                        value="acompanhamento"
                        control={<Radio />}
                        label="Acompanhamento"
                    />
                    <FormControlLabel
                        value="alta"
                        control={<Radio />}
                        label="Alta"
                    />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>Modalidade de atendimento</FormLabel>
                <RadioGroup
                    row
                    value={formData.modalidadeAtendimento}
                    onChange={(e) =>
                        handleInputChange(
                            'modalidadeAtendimento',
                            e.target.value
                        )
                    }
                >
                    <FormControlLabel
                        value="online"
                        control={<Radio />}
                        label="Online"
                    />
                    <FormControlLabel
                        value="presencial"
                        control={<Radio />}
                        label="Presencial"
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default Atividades;
