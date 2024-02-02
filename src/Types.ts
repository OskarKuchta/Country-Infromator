export interface ButtonProps {
    onClick: () => void;
    children: string;
}


export interface FlagProps {
    src: string;
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

interface Name {
    common: string;
    official: string;
    nativeName: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
}

interface Currencies {
    [key: string]: {
        name: string;
        symbol: string;
    };
}

interface Translations {
    [key: string]: {
        official: string;
        common: string;
    };
}

interface Demonyms {
    [key: string]: {
        f: string;
        m: string;
    };
}

interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

interface Flags {
    png: string;
    svg: string;
    alt: string;
}

interface CoatOfArms {
    png: string;
    svg: string;
}

interface CapitalInfo {
    latlng: number[];
}

interface PostalCode {
    format: string;
    regex: string;
}

export interface Country {
    name: Name;
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: Currencies;
    idd: {
        root: string;
        suffixes: string[];
    };
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: {
        [key: string]: string;
    };
    translations: Translations;
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;
    demonyms: Demonyms;
    flag: string;
    maps: Maps;
    population: number;
    fifa: string;
    car: {
        signs: string[];
        side: string;
    };
    timezones: string[];
    continents: string[];
    flags: Flags;
    coatOfArms: CoatOfArms;
    startOfWeek: string;
    capitalInfo: CapitalInfo;
    postalCode: PostalCode;
}