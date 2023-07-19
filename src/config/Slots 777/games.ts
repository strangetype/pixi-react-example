export const SLOTS_MAP: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
];

export const RULES_SLOTS_MAP: string[] = [
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((i: number) => 'textL' + i),
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((i: number) => 'textR' + i)
];
