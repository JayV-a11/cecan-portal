'use client';
import {
    FileDownload as FileDownloadIcon,
    FilterList as FilterListIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FilterModal from '../FilterModal';

// Mock de função para o download de Excel
const handleDownloadExcel = () => {
    console.log('Função de download de Excel chamada');
};

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
    const [data, setData] = useState<Cadastro[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [filters, setFilters] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const userCredentials = localStorage.getItem('USER_CREDENTIALS');
            if (!userCredentials) {
                window.location.href = '/';
                return;
            }

            const { refreshToken } = JSON.parse(userCredentials);
            try {
                const response = await axios.get(
                    `http://localhost:8080/paciente?page=${page}&limit=${rowsPerPage}${filters ? `&fields=${JSON.stringify(filters)}` : ''}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                if (response.status === 401) {
                    window.location.href = '/';
                } else {
                    const result = response.status === 200 ? response.data : [];
                    setData(result);
                }
            } catch (error) {
                toast.error('Erro ao buscar dados.');
            }
        };

        fetchData();
    }, [page, rowsPerPage, filters]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        newPage: number
    ) => {
        setPage(newPage);
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

    const handleApplyFilter = (newFilters) => {
        setFilters(newFilters);
        setOpenFilterModal(false);
    };
    const handleInactivate = (id: string) => {
        console.log(`Cadastro inativado: ${id}`);
    };

    const renderOptions = (status: string, id: string) => {
        return (
            <Box display="flex" gap="8px">
                {status === 'ASSINADO' && (
                    <Tooltip title="Baixar Documento Assinado">
                        <IconButton>
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {(status === 'AGUARDANDO PREENCHIMENTO' ||
                    status === 'AGUARDANDO ASSINATURA') && (
                    <Tooltip title="Baixar Documento">
                        <IconButton>
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip>
                )}
                <Tooltip title="Visualizar Código do Cadastro">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Inativar Cadastro">
                    <IconButton onClick={() => handleInactivate(id)}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
                {status === 'ASSINADO' && (
                    <Tooltip title="Enviar Notificação">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
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
                <TextField
                    label="Buscar por Código ou Nome"
                    variant="outlined"
                    onChange={handleSearch}
                    size="small"
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                />
                <Box>
                    <IconButton onClick={handleFilter}>
                        <FilterListIcon />
                    </IconButton>
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

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nome do Paciente</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index}</TableCell>
                                <TableCell>
                                    {row.nome ?? row.nome_paciente}
                                </TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    {renderOptions(row.status, row.id)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={data.length} // Troque para o total de registros se necessário
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
        </Box>
    );
};

export default PacientesTable;
