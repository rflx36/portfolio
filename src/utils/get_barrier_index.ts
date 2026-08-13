export default function getBarrierIndex(current: number, barriers: number[]): number {
  const index = barriers.findIndex(b => current < b);
  // If current is greater than all barriers, it falls into the last bucket (barriers.length)
  return index === -1 ? barriers.length : index;
}