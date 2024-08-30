export interface IRecords {
    id: number;
    image: string;
    customer_code: string;
    measure_time: Date;
    measure_type: "WATER" | "GAS";
    measure_value: number;
    has_confirmed: boolean;
    measure_uuid: string;
}
