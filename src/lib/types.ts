export type Pet = {
    id: string;
    name: string;
    ownerName: string;
    imageUrl: string;
    age: number;
    notes: string;
}

// Currently not used. Pet[] is defined in PetList as its incoming prop type.
export type Pets = Pet[];