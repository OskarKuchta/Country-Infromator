export interface ButtonProps {
    onClick: () => void;
    children: string;
}

export interface DescribeProps {
    children: string[];
    className?: string;
};

export interface FlagProps {
    src: string;
};

export interface HeaderProps {
    children: React.ReactNode;
};

export interface InputProps {
    onClick: () => void;
}

export interface InputContextProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface RequestOptions {
    headers: {
        Authorization: string;
    };
}