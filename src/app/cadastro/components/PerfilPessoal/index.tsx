import {
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface PerfilPessoalProps {
    onChange: (values: any) => void;
    forms: any;
}

const PerfilPessoal: React.FC<PerfilPessoalProps> = ({ onChange, forms }) => {
    const [formData, setFormData] = useState(
        forms ?? {
            religiao: '',
            estadoCivil: '',
            filhos: '',
            quantidadeFilhos: '',
            resideCom: '',
            relacionamento: '',
            vidaSexual: '',
            satisfacaoCasamento: '',
            redeApoio: '',
            escolaridade: '',
            estudaAtualmente: '',
            pretendeEstudar: '',
            trabalhaFora: '',
            profissao: '',
            satisfacaoProfissao: '',
            satisfacaoTrabalho: '',
            praticaAtividadesFisicas: '',
            atividadesFisicas: '',
            possuiHobbies: '',
            hobbies: '',
            possuiVicios: '',
            quaisVicios: '',
            frequenciaVicios: '',
        }
    );

    const handleInputChange = (field: string, value: string) => {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);
        onChange(updatedData);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {/* Religião e Estado Civil */}
            <Typography variant="h6">Religião e Estado Civil</Typography>
            <TextField
                label="Religião"
                value={formData.religiao}
                onChange={(e) => handleInputChange('religiao', e.target.value)}
            />
            <TextField
                label="Estado Civil"
                required
                value={formData.estadoCivil}
                onChange={(e) =>
                    handleInputChange('estadoCivil', e.target.value)
                }
            />

            {/* Filhos */}
            <FormControl>
                <Typography variant="h6">Filhos</Typography>
                <RadioGroup
                    row
                    value={formData.filhos}
                    onChange={(e) =>
                        handleInputChange('filhos', e.target.value)
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
                {formData.filhos === 'sim' && (
                    <TextField
                        label="Quantos?"
                        value={formData.quantidadeFilhos}
                        onChange={(e) =>
                            handleInputChange(
                                'quantidadeFilhos',
                                e.target.value
                            )
                        }
                    />
                )}
            </FormControl>

            {/* Estrutura Familiar */}
            <Typography variant="h6">Estrutura Familiar</Typography>
            <TextField
                label="Com quem reside?"
                value={formData.resideCom}
                onChange={(e) => handleInputChange('resideCom', e.target.value)}
            />
            <FormControl>
                <InputLabel>Relacionamento</InputLabel>
                <Select
                    value={formData.relacionamento}
                    onChange={(e) =>
                        handleInputChange('relacionamento', e.target.value)
                    }
                >
                    <MenuItem value="calmo">Calmo</MenuItem>
                    <MenuItem value="conturbado">Conturbado</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Vida sexual</InputLabel>
                <Select
                    value={formData.vidaSexual}
                    onChange={(e) =>
                        handleInputChange('vidaSexual', e.target.value)
                    }
                >
                    <MenuItem value="naoAplica">Não se aplica</MenuItem>
                    <MenuItem value="ativa">Ativa</MenuItem>
                    <MenuItem value="abstinencia">Abstinência</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.satisfacaoCasamento === 'sim'}
                        onChange={(e) =>
                            handleInputChange(
                                'satisfacaoCasamento',
                                e.target.checked ? 'sim' : 'nao'
                            )
                        }
                    />
                }
                label="Satisfeito no casamento?"
            />
            <TextField
                label="Rede de apoio"
                value={formData.redeApoio}
                onChange={(e) => handleInputChange('redeApoio', e.target.value)}
            />

            <Typography variant="h6">Escolaridade</Typography>
            <FormControl fullWidth>
                <InputLabel>Escolaridade</InputLabel>
                <Select
                    value={formData.escolaridade}
                    required
                    onChange={(e) =>
                        handleInputChange('escolaridade', e.target.value)
                    }
                >
                    <MenuItem value="naoTem">Não tem</MenuItem>
                    <MenuItem value="ensinoFundamental">
                        Ensino Fundamental
                    </MenuItem>
                    <MenuItem value="ensinoMedio">Ensino Médio</MenuItem>
                    <MenuItem value="ensinoSuperior">Ensino Superior</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.estudaAtualmente === 'sim'}
                        onChange={(e) =>
                            handleInputChange(
                                'estudaAtualmente',
                                e.target.checked ? 'sim' : 'nao'
                            )
                        }
                    />
                }
                label="Estuda atualmente?"
            />
            {formData.estudaAtualmente === 'nao' && (
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.pretendeEstudar === 'sim'}
                            onChange={(e) =>
                                handleInputChange(
                                    'pretendeEstudar',
                                    e.target.checked ? 'sim' : 'nao'
                                )
                            }
                        />
                    }
                    label="Pretende voltar a estudar?"
                />
            )}

            {/* Vida Profissional */}
            <Typography variant="h6">Vida Profissional</Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.trabalhaFora === 'sim'}
                        onChange={(e) =>
                            handleInputChange(
                                'trabalhaFora',
                                e.target.checked ? 'sim' : 'nao'
                            )
                        }
                    />
                }
                label="Trabalha fora?"
            />
            <TextField
                label="Profissão"
                value={formData.profissao}
                onChange={(e) => handleInputChange('profissao', e.target.value)}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.satisfacaoProfissao === 'sim'}
                        onChange={(e) =>
                            handleInputChange(
                                'satisfacaoProfissao',
                                e.target.checked ? 'sim' : 'nao'
                            )
                        }
                    />
                }
                label="Satisfeito na profissão?"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.satisfacaoTrabalho === 'sim'}
                        onChange={(e) =>
                            handleInputChange(
                                'satisfacaoTrabalho',
                                e.target.checked ? 'sim' : 'nao'
                            )
                        }
                    />
                }
                label="Satisfeito no trabalho?"
            />

            {/* Lazer */}
            <Typography variant="h6">Lazer</Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.praticaAtividadesFisicas === 'sim'}
                        onChange={(e) =>
                            handleInputChange(
                                'praticaAtividadesFisicas',
                                e.target.checked ? 'sim' : 'nao'
                            )
                        }
                    />
                }
                label="Pratica atividades físicas?"
            />
            {formData.praticaAtividadesFisicas === 'sim' && (
                <TextField
                    label="Quais atividades?"
                    value={formData.atividadesFisicas}
                    onChange={(e) =>
                        handleInputChange('atividadesFisicas', e.target.value)
                    }
                />
            )}
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.possuiHobbies === 'sim'}
                        onChange={(e) =>
                            handleInputChange(
                                'possuiHobbies',
                                e.target.checked ? 'sim' : 'nao'
                            )
                        }
                    />
                }
                label="Possui hobbies?"
            />
            {formData.possuiHobbies === 'sim' && (
                <TextField
                    label="Quais hobbies?"
                    value={formData.hobbies}
                    onChange={(e) =>
                        handleInputChange('hobbies', e.target.value)
                    }
                />
            )}

            {/* Vícios */}
            <Typography variant="h6">Vícios</Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.possuiVicios === 'sim'}
                        onChange={(e) =>
                            handleInputChange(
                                'possuiVicios',
                                e.target.checked ? 'sim' : 'nao'
                            )
                        }
                    />
                }
                label="Possui vícios?"
            />
            {formData.possuiVicios === 'sim' && (
                <>
                    <TextField
                        label="Quais vícios?"
                        value={formData.quaisVicios}
                        onChange={(e) =>
                            handleInputChange('quaisVicios', e.target.value)
                        }
                    />
                    <TextField
                        label="Frequência"
                        value={formData.frequenciaVicios}
                        onChange={(e) =>
                            handleInputChange(
                                'frequenciaVicios',
                                e.target.value
                            )
                        }
                    />
                </>
            )}
        </Box>
    );
};

export default PerfilPessoal;
