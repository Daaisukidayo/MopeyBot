export type Renames = Record<string, string>;
export type Skins = Record<string, {
    id: string;
}[]>;
export declare function animalIdsMigrator(renames: Renames, skins: Skins): (name: string, value: string) => string;
//# sourceMappingURL=animalIdsMigration.d.ts.map