export const GetRepeatType = (repeat: string) => {
  switch (repeat) {
    case 'hourly':
      return 'hour';
    case 'daily':
      return 'day';
    case 'weekly':
      return 'week';
    case 'bi-weekly':
      return 'week';
    default:
      return undefined;
  }
};

export const GetRepeatTime = (repeat: string) => {
  switch (repeat) {
    case 'hourly':
      return 1;
    case 'daily':
      return 1;
    case 'weekly':
      return 1;
    case 'bi-weekly':
      return 2;
    default:
      return 0;
  }
};
