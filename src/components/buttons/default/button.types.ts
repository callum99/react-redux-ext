import { FormEvent, ReactNode } from "react";

export interface ButtonType {
    className?: string
    btnText: string | ReactNode;
    btnOnClick?: (e: FormEvent) => void;
    type?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean
};
