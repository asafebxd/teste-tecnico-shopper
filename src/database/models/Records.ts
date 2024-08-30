export interface IRecords {
    measure_uuid: string;
    image: string;
    customer_code: string;
    measure_datetime: string;
    measure_type: "WATER" | "GAS";
    has_confirmed: boolean;
    measure_value: number;
}
