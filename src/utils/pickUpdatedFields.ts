import pick from 'lodash.pick';

const pickUpdatedFields = <T extends {}>(
  values: T,
  mask: { [key: string]: true | undefined },
): Partial<T> => pick(values, Object.keys(mask));

export default pickUpdatedFields;
