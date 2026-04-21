import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));   

//  another way if want to export default
    // export default cn;
// or
    // export default function cn(...inputs) { return twMerge(clsx(inputs));}