import { Breadcrumbs, Link, Typography } from '@mui/material';
import PacientesTable from './components/PacientesTable';
import styles from './page.module.css';

function page() {
    return (
        <div className={styles.page}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    MENU
                </Link>
                <Typography sx={{ color: 'text.primary' }}>
                    PACIENTES
                </Typography>
            </Breadcrumbs>
            <PacientesTable />
        </div>
    );
}

export default page;
