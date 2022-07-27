/**
 * Converts the bit per second into Giga bit per second
 *  Gbps : Gigabit per second
 *  1 Gbps = 1000000000 bps
 * Return value with 2 decimal after decimal point
 */
export const bpsToGbps = (bps: number): number => {
    return Number((bps/1000000000).toFixed(2));
}