'use client';
import useCadastroPaciente from '@/app/hooks/useCadastroPaciente';
import {
    ArrowCircleLeft,
    Block as BlockIcon,
    FileDownload as FileDownloadIcon,
    FilterList as FilterListIcon,
    RestartAlt,
    Search as SearchIcon,
    Settings,
    Visibility as VisibilityIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FilterModal from '../FilterModal';
import styles from './index.module.css';
// import './tabelas.css';
interface Cadastro {
    id: string;
    nome_paciente: string;
    status: string;
    Paciente: {
        nome: string;
        codigo: string;
    } | null;
}

const PacientesTable = () => {
    const defaultColumns = [
        { key: 'nome_paciente', label: 'Nome do Paciente' },
        { key: 'status', label: 'Status' },
        { key: 'cpf', label: 'CPF' },
        { key: 'nascimento', label: 'Data de Nascimento' },
        { key: 'contato', label: 'Telefone de Contato' },
        { key: 'cidade', label: 'Cidade' },
        { key: 'estado', label: 'Estado' },
        { key: 'convenio', label: 'Convênio' },
        { key: 'data_diagnostico', label: 'Data do Diagnóstico' },
        { key: 'recidiva', label: 'Recidiva' },
        { key: 'metastase', label: 'Metástase' },
        { key: 'realizou_cirurgia', label: 'Realizou Cirurgia' },
        { key: 'local_tratamento', label: 'Local de Tratamento' },
        { key: 'medico_responsavel', label: 'Médico Responsável' },
    ];

    const [data, setData] = useState<Cadastro[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [openCodeModal, setOpenCodeModal] = useState(false);
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [columns, setColumns] = useState(defaultColumns);
    const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [showInactvateConfirmation, setShowInactivationConfirmation] =
        useState({ show: false, id: null });
    const [filters, setFilters] = useState<any>();
    const [key, setKey] = useState(Math.random());
    const { atualizaCadastrarPaciente } = useCadastroPaciente();

    const router = useRouter();

    const fetchData = async () => {
        const userCredentials = localStorage.getItem('USER_CREDENTIALS');
        if (!userCredentials) {
            localStorage.removeItem('USER_CREDENTIALS');
            router.push('/');
            return;
        }

        const { refreshToken } = JSON.parse(userCredentials);
        try {
            const response = await axios.get(
                `https://cecan-api.onrender.com/paciente?page=${page}&limit=${rowsPerPage}${filters ? `&fields=${JSON.stringify(filters)}` : ''}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );
            console.log(response);
            if (response.status === 401) {
                localStorage.removeItem('USER_CREDENTIALS');
                window.location.href = '/';
            } else {
                const result = response.status === 200 ? response.data : [];
                setData(result);
            }
        } catch (error: any) {
            if (error.status === 401) {
                localStorage.removeItem('USER_CREDENTIALS');
                router.push('/');
            }

            toast.error('Erro ao buscar dados.');
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, filters]);

    const handleDownloadExcel = async () => {
        toast.promise(
            async () => {
                const link = document.createElement('a');
                link.href = `https://cecan-api.onrender.com/exportar?page=${page}&limit=${rowsPerPage}${filters ? `&fields=${JSON.stringify(filters)}` : ''}`;
                link.target = '_blank';
                link.download = '';
                link.click();
            },
            {
                success:
                    'Tabela gerada com sucesso! O download começará em instantes',
                error: 'Houve um erro ao gerar a tabela, tente novamente mais tarde',
                pending: 'O arquivo está sendo gerado. Por favor, aguarde',
            }
        );
    };

    const handleDownloadPDF = async (id: any, status: any) => {
        toast.promise(
            async () => {
                await axios
                    .get(
                        `https://cecan-api.onrender.com/file?id=${id}${status === 'ASSINADO' ? '&assinado=true' : ''}`,
                        {
                            responseType: 'blob',
                        }
                    )
                    .then((response) => {
                        const url = window.URL.createObjectURL(
                            new Blob([response.data])
                        );
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute(
                            'download',
                            `dados_${id}${status === 'ASSINADO' ? '_assinado' : ''}.pdf`
                        );
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch((error) => {
                        console.log('Erro ao baixar o arquivo:', error);
                    });
            },
            {
                error: 'Erro ao baixar arquivo. Tente novamente mais tarde',
                success: 'Arquvio encontrado! O Download começará em breve',
                pending: 'Buscando arquvio, aguarde um momento',
            }
        );
    };

    const handleChangePage = (newPage: any) => {
        setPage(newPage);
    };

    const handleToggleColumn = (key: string) => {
        const updatedColumns = selectedColumns.some((col) => col.key === key)
            ? selectedColumns.filter((col) => col.key !== key)
            : [...selectedColumns, columns.find((col) => col.key === key)!];
        setKey(Math.random());
        setSelectedColumns(updatedColumns);
    };

    const handleResetColumns = () => {
        setSelectedColumns(defaultColumns);
        setColumns(defaultColumns);
    };

    const handleOpenSettingsModal = () => {
        setOpenSettingsModal(true);
    };

    const handleCloseSettingsModal = () => {
        setOpenSettingsModal(false);
    };

    const handleColumnOrderChange = (key: string, direction: 'up' | 'down') => {
        const index = columns.findIndex((col) => col.key === key);
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === columns.length - 1)
        ) {
            return;
        }

        const newOrder = [...columns];
        const [movedColumn] = newOrder.splice(index, 1);
        newOrder.splice(
            direction === 'up' ? index - 1 : index + 1,
            0,
            movedColumn
        );

        setKey(Math.random());
        setSelectedColumns(newOrder);
        setColumns(newOrder);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, nome_paciente: event.target.value });
    };

    const handleFilter = () => {
        setOpenFilterModal(true);
    };

    const handleCloseFilterModal = () => {
        setOpenFilterModal(false);
    };

    const handleApplyFilter = (newFilters: any) => {
        setFilters(newFilters);
        setOpenFilterModal(false);
    };

    const handleInactivate = () => {
        const id = showInactvateConfirmation.id as any;
        toast.promise(
            async () => {
                await atualizaCadastrarPaciente(id, 5);
            },
            {
                error: 'Houve um erro ao atualizar o cadastro do paciente. Tente novamente mais tarde',
                success: 'Paciente inativado com sucesso!',
                pending: 'Inativando paciente. Por favor, aguarde',
            }
        );
        setShowInactivationConfirmation({ show: true, id });
        fetchData();
    };

    const handleShowInactivateModal = (id: any) => {
        setShowInactivationConfirmation({ show: true, id });
        fetchData();
    };

    const handleViewCode = (codigo: any) => {
        setSelectedCode(codigo);
        setOpenCodeModal(true);
    };

    const handleCloseCodeModal = () => {
        setOpenCodeModal(false);
        setSelectedCode(null);
    };

    const renderOptions = (status: string, cadastro: any) => {
        return (
            <Box display="flex" gap="8px">
                {status === 'ASSINADO' && (
                    <Tooltip title="Baixar Documento Assinado">
                        <IconButton
                            onClick={() =>
                                handleDownloadPDF(
                                    cadastro?.codigo ?? cadastro.id,
                                    status
                                )
                            }
                        >
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {status === 'AGUARDANDO ASSINATURA' && (
                    <Tooltip title="Baixar Documento">
                        <IconButton
                            onClick={() =>
                                handleDownloadPDF(
                                    cadastro?.codigo ?? cadastro.id,
                                    status
                                )
                            }
                        >
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip>
                )}

                <Tooltip title="Visualizar Código do Cadastro">
                    <IconButton
                        onClick={() =>
                            handleViewCode(
                                cadastro?.codigo ??
                                    (cadastro.id || 'Código não disponível')
                            )
                        }
                    >
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Inativar Cadastro">
                    <IconButton
                        onClick={() => handleShowInactivateModal(cadastro.id)}
                    >
                        <BlockIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        );
    };

    return (
        <Box>
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowCircleLeft />}
                    onClick={() => router.push('/home')}
                >
                    Voltar para o menu
                </Button>
                <Box>
                    <TextField
                        label="Buscar por nome do paciente"
                        variant="outlined"
                        onChange={handleSearch}
                        size="small"
                        InputProps={{
                            startAdornment: <SearchIcon />,
                        }}
                    />
                    <Tooltip title="Configurar Colunas">
                        <IconButton onClick={handleOpenSettingsModal}>
                            <Settings />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Resetar Coluna">
                        <IconButton onClick={handleResetColumns}>
                            <RestartAlt />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Busca avançada">
                        <IconButton onClick={handleFilter}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FileDownloadIcon />}
                        onClick={handleDownloadExcel}
                    >
                        Baixar Excel
                    </Button>
                </Box>
            </header>

            <TableContainer key={key}>
                <Table>
                    <TableHead className={styles.tableHeader}>
                        <TableRow>
                            {selectedColumns.map((col) => (
                                <TableCell key={col.key}>{col.label}</TableCell>
                            ))}
                            <TableCell>Opçoes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.tableBody}>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                {selectedColumns.map((col) => (
                                    <TableCell key={col.key}>
                                        {
                                            row[
                                                col.key as keyof Cadastro
                                            ] as string
                                        }
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {renderOptions(row.status, row)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <FilterModal
                open={openFilterModal}
                onClose={handleCloseFilterModal}
                onApplyFilter={handleApplyFilter}
            />

            <Modal open={openSettingsModal} onClose={handleCloseSettingsModal}>
                <Box className={styles.customColumnsModal}>
                    <Typography variant="h6">Configurar Colunas</Typography>
                    {columns.map((col, index) => (
                        <Box
                            key={col.key}
                            className={styles.customFilterItems}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mt={2}
                        >
                            <Checkbox
                                checked={selectedColumns.some(
                                    (selectedCol) => selectedCol.key === col.key
                                )}
                                onChange={() => handleToggleColumn(col.key)}
                            />
                            <Typography>{col.label}</Typography>
                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handleColumnOrderChange(col.key, 'up')
                                    }
                                    disabled={index === 0}
                                >
                                    ↑
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        handleColumnOrderChange(col.key, 'down')
                                    }
                                    disabled={index === columns.length - 1}
                                >
                                    ↓
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCloseSettingsModal}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Fechar
                    </Button>
                </Box>
            </Modal>

            <Modal open={openCodeModal} onClose={handleCloseCodeModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 1,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Código do Cadastro
                    </Typography>
                    <TextField
                        fullWidth
                        value={selectedCode}
                        InputProps={{
                            readOnly: true,
                        }}
                        margin="dense"
                    />
                    <Button
                        onClick={() =>
                            navigator.clipboard.writeText(selectedCode as any)
                        }
                        variant="contained"
                    >
                        Copiar Link
                    </Button>
                </Box>
            </Modal>

            <Dialog
                open={showInactvateConfirmation.show}
                onClose={() =>
                    setShowInactivationConfirmation({ show: false, id: null })
                }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Deseja inativar esse usuário?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação tornará o status do paciente como INATIVO.
                        Apenas prossiga com esse processo em caso de solicitação
                        de inativação por parte do paciente ou óbito do paciente
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            setShowInactivationConfirmation({
                                show: false,
                                id: null,
                            })
                        }
                    >
                        Disagree
                    </Button>
                    <Button onClick={handleInactivate} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PacientesTable;
