import { MultiplierGroup } from './types';
import { MULTIPLIER_LABELS } from './labels';

export const DEFAULT_MULTIPLIER_GROUPS: MultiplierGroup[] = [
  {
    id: 'group1',
    values: [10000, 10010, 10100],
    multiplier: 20,
    label: `${MULTIPLIER_LABELS.CIGARETTES_AND_HEATED_TOBACCO} (${MULTIPLIER_LABELS.VALUES_10000})`
  },
  {
    id: 'group2',
    values: [10200, 10110],
    multiplier: 10,
    label: `${MULTIPLIER_LABELS.DISPOSABLE_ECIGS_AND_HERBAL} (${MULTIPLIER_LABELS.VALUES_10200})`
  },
  {
    id: 'group3',
    values: [11000],
    multiplier: 8,
    label: `${MULTIPLIER_LABELS.CIGARETTE_TOBACCO} (${MULTIPLIER_LABELS.VALUE_11000})`
  },
  {
    id: 'group4',
    values: [12000, 12010],
    multiplier: 5,
    label: `${MULTIPLIER_LABELS.CIGARS} (${MULTIPLIER_LABELS.VALUES_12000})`
  },
  {
    id: 'group5',
    values: [50010],
    multiplier: 0.25,
    label: `${MULTIPLIER_LABELS.NON_LOTTERY_SERVICES} (${MULTIPLIER_LABELS.VALUE_50010})`
  }
];