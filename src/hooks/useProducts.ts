import { useState, useEffect } from 'react'
import type { Product } from '../types'
type LoadingState = 
		| { status: 'loading' } 
		| { status: 'error', message: string } 
		| { status: 'success'; products: Product[] }


export default function useProducts() {
    const [load, setLoad] = useState<LoadingState>({ status: 'loading' });

    useEffect(() => {
        let ignore = false;
        fetch('/products.json')
            .then(res => {
                if(!res.ok) throw new Error('Network response was not ok');
                return res.json() as Promise<Product[]>;
            })
            .then(data => {
                if(!ignore) {
                    setLoad({ status: 'success', products: data });
                }
            })
            .catch(error => {
                if(!ignore) setLoad({ status: 'error', message: error.message });
            });
        return () => { ignore = true; };
    }, []);

    return load;
}