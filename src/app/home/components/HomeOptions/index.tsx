'use client';
import useCadastroPaciente from '@/app/hooks/useCadastroPaciente';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CadastroPacienteModal from '../CadastroPacienteModal';
import style from './index.module.css';

function Index() {
    const [openModal, setOpenModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [linkCadastro, setLinkCadastro] = useState('');
    const { cadastrarPaciente } = useCadastroPaciente();
    const router = useRouter();

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };

    const handleSubmitPaciente = async (nomePaciente: string) => {
        try {
            const response = await cadastrarPaciente(nomePaciente, 2);
            const { id } = response; // Supondo que a resposta tenha um campo `id`

            handleCloseModal();

            // Gerar o link com o id do paciente
            const url = `/cadastro?id=${id}`;
            setLinkCadastro(url);
            setOpenSuccessModal(true); // Abre o modal de sucesso com o link
        } catch (error) {
            console.error('Erro ao cadastrar paciente:', error);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(
            `https://cecan-portal.vercel.app${linkCadastro}`
        );
    };

    const handleLogoff = () => {
        localStorage.removeItem('USER_CREDENTIALS');
        router.push('/');
    };

    useEffect(() => {
        const credentials = localStorage.getItem('USER_CREDENTIALS');
        if (!credentials) router.push('/');
    }, [router]);

    return (
        <Box className={style.box}>
            <Button
                variant="contained"
                className={style.button}
                onClick={handleOpenModal}
            >
                CADASTRAR PACIENTE
            </Button>
            <Button
                variant="contained"
                onClick={() => router.push('/pacientes')}
                className={style.button}
            >
                PACIENTES
            </Button>
            <Button
                onClick={handleLogoff}
                variant="contained"
                className={`${style.button} ${style.close}`}
            >
                SAIR
            </Button>

            <CadastroPacienteModal
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmitPaciente}
            />

            <Dialog open={openSuccessModal} onClose={handleCloseSuccessModal}>
                <DialogTitle>Paciente Cadastrado com Sucesso!</DialogTitle>
                <DialogContent>
                    <p>
                        Copie o link abaixo para acessar o cadastro do paciente:
                    </p>
                    <TextField
                        fullWidth
                        value={`https://cecan-portal.vercel.app${linkCadastro}`}
                        InputProps={{
                            readOnly: true,
                        }}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCopyLink} variant="contained">
                        Copiar Link
                    </Button>
                    <Button onClick={handleCloseSuccessModal} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Index;
