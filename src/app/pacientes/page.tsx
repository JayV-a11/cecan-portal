import PacientesTable from './components/PacientesTable';
import styles from './page.module.css';

function page() {
    return (
        <div className={styles.page}>
            <PacientesTable />
        </div>
    );
}

export default page;
