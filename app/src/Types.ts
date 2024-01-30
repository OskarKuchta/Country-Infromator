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

export interface Options {
    weekday: "long" | "short" | "narrow";
    month: "numeric" | "2-digit" | "long" | "short" | "narrow";
    day: "numeric" | "2-digit";
    hour: "numeric" | "2-digit";
    minute: "numeric" | "2-digit";
    second: "numeric" | "2-digit";
    hour12: true | false;
}

export interface RequestOptions {
    headers: {
        Authorization: string;
    };
}