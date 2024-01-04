interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Pokemon {
    id: number;
    name: string;
    stats: Stat[];
    types: Type[];
}
