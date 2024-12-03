'use client';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from '@mui/material';
import { useState } from 'react';

const FilterModal = ({ open, onClose, onApplyFilter }: any) => {
    const [filters, setFilters] = useState({
        status: '',
        Paciente: {
            nome: '',
            rg: '',
            cpf: '',
            nascimento: '',
            sus: '',
            convenio: '',
            estado_civil: '',
            escolaridade: '',
            contato: '',
            codigo: '',
        },
        Endereco: {
            cep: '',
            rua: '',
            numero: '',
            cidade: '',
            bairro: '',
            estado: '',
            complemento: '',
        },
        QuadroClinico: {
            recidiva: '',
            metastase: '',
            realizou_cirurgia: '',
            realiza_exames_prevencao: '',
            realiza_tratamento_outras_doencas: '',
            local_tratamento: '',
            medico_responsavel: '',
            data_diagnostico: '',
        },
        SitSocieconomica: {
            recebe_beneficio: '',
            aposentado: '',
            desempregado: '',
            moradia: '',
            renda_per_capita: '',
        },
    } as any);

    const handleChange = (e: any, category: any, field: any) => {
        const { value } = e.target;
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [field]: value,
            },
        }));
    };

    const handleApplyFilter = () => {
        onApplyFilter(filters);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Filtrar Pacientes</DialogTitle>
            <DialogContent>
                <TextField
                    label="Status"
                    name="status"
                    value={filters.status}
                    onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                    select
                >
                    <MenuItem value="">Não selecionado</MenuItem>
                    <MenuItem value="AGUARDANDO PREENCHIMENTO">
                        AGUARDANDO PREENCHIMENTO
                    </MenuItem>
                    <MenuItem value="AGUARDANDO ASSINATURA">
                        AGUARDANDO ASSINATURA
                    </MenuItem>
                    <MenuItem value="ASSINADO">ASSINADO</MenuItem>
                    <MenuItem value="ASSINADO">ENCERRADO</MenuItem>
                </TextField>

                {/* Paciente Filters */}
                {[
                    'nome',
                    'rg',
                    'cpf',
                    'nascimento',
                    'sus',
                    'estado_civil',
                    'escolaridade',
                    'contato',
                    'codigo',
                ].map((field) => (
                    <TextField
                        key={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={filters.Paciente[field]}
                        onChange={(e) => handleChange(e, 'Paciente', field)}
                        fullWidth
                        margin="normal"
                    />
                ))}

                <TextField
                    label="Convênio"
                    name="convenio"
                    value={filters.Paciente.convenio}
                    onChange={(e) => handleChange(e, 'Paciente', 'convenio')}
                    fullWidth
                    margin="normal"
                    select
                >
                    <MenuItem value="">Não selecionado</MenuItem>
                    <MenuItem value="sim">Sim</MenuItem>
                    <MenuItem value="nao">Não</MenuItem>
                </TextField>

                {/* Endereco Filters */}
                {[
                    'cep',
                    'rua',
                    'numero',
                    'cidade',
                    'bairro',
                    'estado',
                    'complemento',
                ].map((field) => (
                    <TextField
                        key={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={filters.Endereco[field]}
                        onChange={(e) => handleChange(e, 'Endereco', field)}
                        fullWidth
                        margin="normal"
                    />
                ))}

                {/* QuadroClinico Filters */}
                {[
                    'local_tratamento',
                    'medico_responsavel',
                    'data_diagnostico',
                ].map((field) => (
                    <TextField
                        key={field}
                        label={
                            field
                                .replace(/_/g, ' ') // Substitui underscores por espaços
                                .replace(/^\w/, (c) => c.toUpperCase()) // Coloca a primeira letra em maiúscula
                        }
                        value={filters.QuadroClinico[field]}
                        onChange={(e) =>
                            handleChange(e, 'QuadroClinico', field)
                        }
                        fullWidth
                        margin="normal"
                    />
                ))}

                {[
                    'recidiva',
                    'metastase',
                    'realizou_cirurgia',
                    'realiza_exames_prevencao',
                    'realiza_tratamento_outras_doencas',
                ].map((field) => (
                    <TextField
                        key={field}
                        label={
                            field
                                .replace(/_/g, ' ') // Substitui underscores por espaços
                                .replace(/^\w/, (c) => c.toUpperCase()) // Coloca a primeira letra em maiúscula
                        }
                        value={filters.QuadroClinico[field]}
                        onChange={(e) =>
                            handleChange(e, 'QuadroClinico', field)
                        }
                        fullWidth
                        margin="normal"
                        select
                    >
                        <MenuItem value="">Não selecionado</MenuItem>
                        <MenuItem value="sim">Sim</MenuItem>
                        <MenuItem value="nao">Não</MenuItem>
                    </TextField>
                ))}

                {/* SitSocieconomica Filters */}
                {['moradia', 'renda_per_capita'].map((field: any) => (
                    <TextField
                        key={field}
                        label={
                            field
                                .replace(/_/g, ' ') // Substitui underscores por espaços
                                .replace(/^\w/, (c: any) => c.toUpperCase()) // Coloca a primeira letra em maiúscula
                        }
                        value={filters.SitSocieconomica[field]}
                        onChange={(e) =>
                            handleChange(e, 'SitSocieconomica', field)
                        }
                        fullWidth
                        margin="normal"
                    />
                ))}

                {['recebe_beneficio', 'aposentado', 'desempregado'].map(
                    (field) => (
                        <TextField
                            key={field}
                            label={
                                field
                                    .replace(/_/g, ' ') // Substitui underscores por espaços
                                    .replace(/^\w/, (c) => c.toUpperCase()) // Coloca a primeira letra em maiúscula
                            }
                            value={filters.SitSocieconomica[field]}
                            onChange={(e) =>
                                handleChange(e, 'SitSocieconomica', field)
                            }
                            fullWidth
                            margin="normal"
                            select
                        >
                            <MenuItem value="">Não selecionado</MenuItem>
                            <MenuItem value="sim">Sim</MenuItem>
                            <MenuItem value="nao">Não</MenuItem>
                        </TextField>
                    )
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleApplyFilter}>Aplicar Filtros</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterModal;
