'use client';
import { Lock, Person } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { InputAdornment, Snackbar, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import logo from '../../../../public/images/logo.svg';
import style from './index.module.css';

const index = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [snack, setSnack] = useState<any>({
        show: false,
        message: '',
        duration: 0,
    });

    const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const data = { login, password };
            const res = await axios.post(
                'https://cecan-api.onrender.com/login',
                data
            );

            if (res.status > 400) {
                throw new Error(res.data);
            } else {
                localStorage.setItem(
                    'USER_CREDENTIALS',
                    JSON.stringify(res.data)
                );
                router.push('/home');
            }
            setLoading(false);
        } catch (error: any) {
            localStorage.removeItem('USER_CREDENTIALS');
            if (error.length > 0) error.map((err: any) => toast.error(err));
            else toast.error('Usuário ou senha invalidos');
            setLoading(false);
        }
    };

    useEffect(() => {
        const credentials = localStorage.getItem('USER_CREDENTIALS');
        if (!credentials) router.push('/');
    }, [router]);

    return (
        <Box className={style.box} component="section">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snack.show}
                autoHideDuration={snack.duration}
                message={snack.message}
                onClose={() =>
                    setSnack({
                        show: false,
                        message: '',
                        duration: 0,
                    })
                }
            />
            <Image src={logo} alt="logo" />
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Person sx={{ color: '#fff' }} />
                        </InputAdornment>
                    ),
                }}
                id="login"
                label="Usuário"
                className={style.customField}
                value={login}
                onChange={(event) => setLogin(event.target.value)}
            />
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock sx={{ color: '#fff' }} />
                        </InputAdornment>
                    ),
                }}
                type="password"
                id="password"
                label="Senha"
                className={style.customField}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <LoadingButton
                variant="contained"
                className={style.button}
                onClick={handleLogin}
                loading={loading}
            >
                ENTRAR
            </LoadingButton>
        </Box>
    );
};

export default index;
