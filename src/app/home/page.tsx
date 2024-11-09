import HomeOptions from './components/HomeOptions';
import style from './page.module.css';

function page() {
    return (
        <div className={style.page}>
            <HomeOptions />
        </div>
    );
}

export default page;
