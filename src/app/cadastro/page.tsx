import { Suspense } from 'react';
import Stepper from './components/Stepper';
import './mobileCadastro.css';
function page() {
    return (
        <Suspense>
            <div className="mobileCadastro">
                <Stepper />
            </div>
        </Suspense>
    );
}

export default page;
