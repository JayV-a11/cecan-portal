'use client';
import { useSearchParams } from 'next/navigation';
import Stepper from './components/Stepper';
import './index.css';
function page() {
    const searchParams = useSearchParams();

    return (
        <div className="mobileCadastro">
            <Stepper searchParams={searchParams} />
        </div>
    );
}

export default page;
