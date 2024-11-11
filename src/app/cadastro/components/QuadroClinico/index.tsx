import {
    Box,
    FormControl,
    FormControlLabel,
    FormGroup,
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

interface QuadroClinicoProps {
    onChange: (values: any) => void;
    forms: any;
}

const QuadroClinico: React.FC<QuadroClinicoProps> = ({ onChange, forms }) => {
    const [formData, setFormData] = useState(
        forms ?? {
            diagnostico: '',
            dataDiagnostico: '',
            recidiva: '',
            metastase: '',
            realizouCirurgia: '',
            qualCirurgia: '',
            tratamento: '',
            medicoResponsavel: '',
            localTratamento: '',
            examesPrevencao: '',
            tratamentoOutraDoenca: '',
            quaisTratamentoOutraDoenca: '',
            localTratamentoOutraDoenca: '',
            fazUsoMedicamentos: '',
            quaisMedicamentos: '',
            medicamentosRedePublica: '',
            sono: '',
            apetite: '',
            procurouInformacoes: '',
            comoObteveInformacoes: '',
            quemIndicou: '',
        }
    );

    const handleInputChange = (field: string, value: string) => {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);
        onChange(updatedData);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {/* Diagnóstico */}
            <Typography variant="h6">Quadro Clínico</Typography>
            <TextField
                label="Diagnóstico"
                value={formData.diagnostico}
                onChange={(e) =>
                    handleInputChange('diagnostico', e.target.value)
                }
                required
            />
            <TextField
                label="Quando foi diagnosticado?"
                type="date"
                value={formData.dataDiagnostico}
                onChange={(e) =>
                    handleInputChange('dataDiagnostico', e.target.value)
                }
                required
                InputLabelProps={{ shrink: true }}
            />
            <FormControl>
                <Typography variant="h6">Recidiva e Metástase</Typography>
                <FormGroup>
                    <FormLabel>Recidiva </FormLabel>
                    <RadioGroup
                        row
                        value={formData.recidiva}
                        onChange={(e) =>
                            handleInputChange('recidiva', e.target.value)
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
                </FormGroup>
                <FormGroup>
                    <FormLabel>Metástase</FormLabel>
                    <RadioGroup
                        row
                        value={formData.metastase}
                        onChange={(e) =>
                            handleInputChange('metastase', e.target.value)
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
                </FormGroup>
            </FormControl>
            <FormGroup>
                <FormLabel>Realizou cirurgia</FormLabel>
                <RadioGroup
                    row
                    value={formData.realizouCirurgia}
                    onChange={(e) =>
                        handleInputChange('realizouCirurgia', e.target.value)
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
            </FormGroup>
            {formData.realizouCirurgia === 'sim' && (
                <FormControl>
                    <TextField
                        label="Qual cirurgia?"
                        value={formData.qualCirurgia}
                        onChange={(e) =>
                            handleInputChange('qualCirurgia', e.target.value)
                        }
                    />
                </FormControl>
            )}
            <FormControl>
                <TextField
                    label="Tratamento"
                    required
                    value={formData.tratamento}
                    onChange={(e) =>
                        handleInputChange('tratamento', e.target.value)
                    }
                />
            </FormControl>{' '}
            <FormControl>
                <TextField
                    label="Médico responsável"
                    value={formData.medicoResponsavel}
                    onChange={(e) =>
                        handleInputChange('medicoResponsavel', e.target.value)
                    }
                    required
                />
            </FormControl>
            <FormControl>
                <TextField
                    label="Local de tratamento"
                    value={formData.localTratamento}
                    onChange={(e) =>
                        handleInputChange('localTratamento', e.target.value)
                    }
                    required
                />
            </FormControl>
            <FormGroup>
                <FormLabel>Realizava exames de prevenção</FormLabel>
                <RadioGroup
                    row
                    value={formData.examesPrevencao}
                    onChange={(e) =>
                        handleInputChange('examesPrevencao', e.target.value)
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
            </FormGroup>
            <FormGroup>
                <FormLabel>
                    Realiza tratamento médico para outra doença
                </FormLabel>
                <RadioGroup
                    row
                    value={formData.tratamentoOutraDoenca}
                    onChange={(e) =>
                        handleInputChange(
                            'tratamentoOutraDoenca',
                            e.target.value
                        )
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
            </FormGroup>
            {formData.tratamentoOutraDoenca === 'sim' && (
                <>
                    <FormGroup>
                        <TextField
                            label="Quais tratamentos?"
                            value={formData.quaisTratamentoOutraDoenca}
                            onChange={(e) =>
                                handleInputChange(
                                    'quaisTratamentoOutraDoenca',
                                    e.target.value
                                )
                            }
                        />
                    </FormGroup>

                    <FormGroup>
                        <TextField
                            label="Local de tratamento"
                            value={formData.localTratamentoOutraDoenca}
                            onChange={(e) =>
                                handleInputChange(
                                    'localTratamentoOutraDoenca',
                                    e.target.value
                                )
                            }
                        />
                    </FormGroup>
                </>
            )}
            <FormGroup>
                <FormLabel>Faz uso de medicamentos</FormLabel>
                <RadioGroup
                    row
                    value={formData.fazUsoMedicamentos}
                    onChange={(e) =>
                        handleInputChange('fazUsoMedicamentos', e.target.value)
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
            </FormGroup>
            {formData.fazUsoMedicamentos === 'sim' && (
                <FormGroup>
                    <FormLabel>Medicamentos da rede pública</FormLabel>
                    <RadioGroup
                        row
                        value={formData.medicamentosRedePublica}
                        onChange={(e) =>
                            handleInputChange(
                                'medicamentosRedePublica',
                                e.target.value
                            )
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
                </FormGroup>
            )}
            <FormGroup>
                <FormLabel>Sono</FormLabel>
                <RadioGroup
                    row
                    value={formData.sono}
                    onChange={(e) => handleInputChange('sono', e.target.value)}
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
            </FormGroup>
            <InputLabel>Apetite</InputLabel>
            <Select
                value={formData.apetite}
                onChange={(e) => handleInputChange('apetite', e.target.value)}
            >
                <MenuItem value="intenso">Intenso</MenuItem>
                <MenuItem value="moderado">Moderado</MenuItem>
                <MenuItem value="ausente">Ausente</MenuItem>
            </Select>
            <FormGroup>
                <FormLabel>
                    Após receber o diagnóstico, procurou mais informações sobre
                    a doença
                </FormLabel>
                <RadioGroup
                    row
                    value={formData.procurouInformacoes}
                    onChange={(e) =>
                        handleInputChange('procurouInformacoes', e.target.value)
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
            </FormGroup>
            {formData.procurouInformacoes === 'sim' && (
                <TextField
                    label="Como obteve as informações?"
                    value={formData.comoObteveInformacoes}
                    onChange={(e) =>
                        handleInputChange(
                            'comoObteveInformacoes',
                            e.target.value
                        )
                    }
                />
            )}
            <TextField
                label="Quem indicou a cecan?"
                value={formData.quemIndicou}
                onChange={(e) =>
                    handleInputChange('quemIndicou', e.target.value)
                }
            />
        </Box>
    );
};

export default QuadroClinico;
