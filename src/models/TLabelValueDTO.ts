export interface LabelValueDTO<T> {
    value: T;
    label: string;
    data?: any
}

export interface PKFKPair<TPK, TFK> {
    labelValuePK: LabelValueDTO<TPK>;
    labelValueFK: LabelValueDTO<TFK>;
}