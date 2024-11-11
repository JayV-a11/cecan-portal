import {
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import { useState } from 'react';

const Dados = ({ onChange, forms }: any) => {
    const [formValues, setFormValues] = useState(
        forms ?? {
            nome: '',
            dataNascimento: '',
            convenioMedico: 'não',
            rg: '',
            cpf: '',
            cartaoSus: '',
        }
    );

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const updatedFormValues = {
            ...formValues,
            [name]: value,
        };
        setFormValues(updatedFormValues);
        onChange(updatedFormValues); // Passa os valores para o componente pai
    };

    const formatRG = (value: any) => {
        const rg = value?.substring(0, 9);
        return rg
            ?.replace(/[^0-9A-Za-z]/g, '')
            ?.replace(/^(.{2})(.{3})(.{3})(.{1})$/, '$1.$2.$3-$4');
    };

    const formatCPF = (value: any) => {
        return value
            ?.replace(/\D/g, '')
            ?.replace(/(\d{3})(\d)/, '$1.$2')
            ?.replace(/(\d{3})(\d)/, '$1.$2')
            ?.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    return (
        <FormGroup>
            <FormControl>
                <TextField
                    name="nome"
                    label="Nome"
                    required
                    value={formValues.nome}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>

            <FormControl>
                <TextField
                    name="dataNascimento"
                    label="Data de Nascimento"
                    type="date"
                    required
                    value={formValues.dataNascimento}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Possui Convênio Médico*</FormLabel>
                <RadioGroup
                    name="convenioMedico"
                    value={formValues.convenioMedico}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel
                        value="sim"
                        control={<Radio />}
                        label="Sim"
                    />
                    <FormControlLabel
                        value="não"
                        control={<Radio />}
                        label="Não"
                    />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <TextField
                    name="rg"
                    label="RG"
                    required
                    value={formatRG(formValues.rg)}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>

            <FormControl>
                <TextField
                    name="cpf"
                    required
                    label="CPF"
                    value={formatCPF(formValues.cpf)}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>

            <FormControl>
                <FormLabel></FormLabel>
                <TextField
                    name="cartaoSus"
                    label="Cartão SUS"
                    required
                    value={formValues.cartaoSus}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
        </FormGroup>
    );
};

export default Dados;
