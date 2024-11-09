'use client';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface CadastroPacienteModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (nomePaciente: string) => void;
}

const CadastroPacienteModal: React.FC<CadastroPacienteModalProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [nomePaciente, setNomePaciente] = useState('');

    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomePaciente(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(nomePaciente);
        setNomePaciente(''); // Limpa o campo após o envio
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Iniciar cadastro de paciente?</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome do paciente"
                    fullWidth
                    variant="outlined"
                    value={nomePaciente}
                    onChange={handleNomeChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CadastroPacienteModal;
