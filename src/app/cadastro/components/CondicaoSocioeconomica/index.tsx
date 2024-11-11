import {
    Box,
    Button,
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

interface CondicaoSocioeconomicaProps {
    onChange: (values: any) => void;
    forms: any;
}

const CondicaoSocioeconomica: React.FC<CondicaoSocioeconomicaProps> = ({
    onChange,
    forms,
}) => {
    const [formData, setFormData] = useState(
        forms
            ? {
                  ...forms,
                  composicaoFamiliar: forms.composicaoFamiliar
                      ? forms.composicaoFamiliar
                      : [
                            {
                                vinculo: '',
                                dataNascimento: '',
                                escolaridade: '',
                                ocupacao: '',
                                renda: '',
                            },
                        ],
              }
            : {
                  recebeBeneficio: '',
                  qualBeneficio: '',
                  aposentado: '',
                  desempregado: '',
                  moradia: '',
                  apoioOutroLocal: '',
                  qualApoio: '',
                  composicaoFamiliar: [
                      {
                          vinculo: '',
                          dataNascimento: '',
                          escolaridade: '',
                          ocupacao: '',
                          renda: '',
                      },
                  ],
                  rendaPerCapita: '',
                  dor: '',
                  visaoSobreCancer: '',
                  impactosDoenca: '',
                  mudouVida: '',
                  projetosFuturos: '',
              }
    );

    const handleInputChange = (
        field: string,
        value: string | number,
        index?: number
    ) => {
        if (index !== undefined) {
            const updatedComposicaoFamiliar = [...formData.composicaoFamiliar];
            updatedComposicaoFamiliar[index][field] = value;
            setFormData({
                ...formData,
                composicaoFamiliar: updatedComposicaoFamiliar,
            });
        } else {
            setFormData({ ...formData, [field]: value });
        }
        onChange(formData);
    };

    const addComposicaoFamiliar = () => {
        setFormData({
            ...formData,
            composicaoFamiliar: [
                ...formData.composicaoFamiliar,
                {
                    vinculo: '',
                    dataNascimento: '',
                    escolaridade: '',
                    ocupacao: '',
                    renda: '',
                },
            ],
        });
    };

    const removeComposicaoFamiliar = (index: number) => {
        const updatedComposicaoFamiliar = formData.composicaoFamiliar.filter(
            (_: any, i: number) => i !== index
        );
        setFormData({
            ...formData,
            composicaoFamiliar: updatedComposicaoFamiliar,
        });
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Condição Socioeconômica</Typography>

            <FormGroup>
                <FormLabel>Recebe algum benefício?</FormLabel>
                <RadioGroup
                    row
                    value={formData.recebeBeneficio}
                    onChange={(e) =>
                        handleInputChange('recebeBeneficio', e.target.value)
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
            {formData.recebeBeneficio === 'sim' && (
                <TextField
                    label="Qual benefício?"
                    value={formData.qualBeneficio}
                    onChange={(e) =>
                        handleInputChange('qualBeneficio', e.target.value)
                    }
                />
            )}

            <FormGroup>
                <FormLabel>Aposentado </FormLabel>
                <RadioGroup
                    row
                    value={formData.aposentado}
                    onChange={(e) =>
                        handleInputChange('aposentado', e.target.value)
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
                <FormLabel>Desempregado </FormLabel>
                <RadioGroup
                    row
                    value={formData.desempregado}
                    onChange={(e) =>
                        handleInputChange('desempregado', e.target.value)
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

            <FormControl>
                <InputLabel>Moradia</InputLabel>
                <Select
                    value={formData.moradia}
                    onChange={(e) =>
                        handleInputChange('moradia', e.target.value)
                    }
                >
                    <MenuItem value="propria">Própria</MenuItem>
                    <MenuItem value="alugada">Alugada</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Apoio de outro local </FormLabel>
                <RadioGroup
                    row
                    value={formData.apoioOutroLocal}
                    onChange={(e) =>
                        handleInputChange('apoioOutroLocal', e.target.value)
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
                {formData.apoioOutroLocal === 'sim' && (
                    <TextField
                        label="Qual apoio?"
                        value={formData.qualApoio}
                        onChange={(e) =>
                            handleInputChange('qualApoio', e.target.value)
                        }
                    />
                )}
            </FormControl>

            {/* Composição Familiar */}
            <Typography variant="h6">Composição Familiar</Typography>
            {formData?.composicaoFamiliar?.map(
                (familiar: any, index: number) => (
                    <Box
                        key={index}
                        display="flex"
                        flexDirection="column"
                        gap={2}
                    >
                        <TextField
                            label="Vínculo"
                            value={familiar.vinculo}
                            onChange={(e) =>
                                handleInputChange(
                                    'vinculo',
                                    e.target.value,
                                    index
                                )
                            }
                        />
                        <TextField
                            label="Data de Nascimento"
                            type="date"
                            value={familiar.dataNascimento}
                            onChange={(e) =>
                                handleInputChange(
                                    'dataNascimento',
                                    e.target.value,
                                    index
                                )
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Escolaridade"
                            value={familiar.escolaridade}
                            onChange={(e) =>
                                handleInputChange(
                                    'escolaridade',
                                    e.target.value,
                                    index
                                )
                            }
                        />
                        <TextField
                            label="Ocupação"
                            value={familiar.ocupacao}
                            onChange={(e) =>
                                handleInputChange(
                                    'ocupacao',
                                    e.target.value,
                                    index
                                )
                            }
                        />
                        <TextField
                            label="Renda"
                            value={familiar.renda}
                            onChange={(e) =>
                                handleInputChange(
                                    'renda',
                                    e.target.value,
                                    index
                                )
                            }
                        />
                        {formData.composicaoFamiliar.length > 1 && (
                            <Button
                                onClick={() => removeComposicaoFamiliar(index)}
                                color="error"
                            >
                                Remover
                            </Button>
                        )}
                    </Box>
                )
            )}
            <Button onClick={addComposicaoFamiliar}>Adicionar Renda</Button>

            {/* Renda Per Capita */}
            <TextField
                label="Renda Per Capita"
                value={formData.rendaPerCapita}
                onChange={(e) =>
                    handleInputChange('rendaPerCapita', e.target.value)
                }
            />

            {/* Biopsico */}
            <Typography variant="h6">Aspectos Biopsicossociais</Typography>
            <TextField
                label="Sente dor? De 0 a 10, como classificaria?"
                type="number"
                value={formData.dor}
                inputProps={{ min: 0, max: 10 }}
                onChange={(e) => handleInputChange('dor', e.target.value)}
            />
            <TextField
                label="Qual a sua visão sobre o câncer?"
                value={formData.visaoSobreCancer}
                onChange={(e) =>
                    handleInputChange('visaoSobreCancer', e.target.value)
                }
            />
            <TextField
                label="Quais impactos esta doença trouxe para sua vida, inclusive para as pessoas importantes?"
                value={formData.impactosDoenca}
                onChange={(e) =>
                    handleInputChange('impactosDoenca', e.target.value)
                }
            />
            <TextField
                label="Você mudou alguma coisa na sua vida depois do diagnóstico?"
                value={formData.mudouVida}
                onChange={(e) => handleInputChange('mudouVida', e.target.value)}
            />
            <TextField
                label="Quais seus projetos para depois do tratamento?"
                value={formData.projetosFuturos}
                onChange={(e) =>
                    handleInputChange('projetosFuturos', e.target.value)
                }
            />
        </Box>
    );
};

export default CondicaoSocioeconomica;
