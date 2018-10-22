export const required = value => (value || typeof value === 'number' ? undefined : 'Required field')

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters allowed'
    : undefined

export const numericCost = value =>
  value && /[^0-9 .,]/i.test(value)
    ? 'Only numeric characters allowed'
    : undefined

export const alpha = value =>
  value && /[^a-zA-Z ]/i.test(value)
    ? 'Only alphabetic characters allowed'
    : undefined

export const customMinLength = (msg, min, max, value) =>
  (value && (value.length < min || value.length > max)
    ? `${msg} must be between 2 and 30 alpha characters (A-Z).`
    : undefined);

export const minMaxLengthName = value => customMinLength('Name', 2, 30, value);

const customAlpha = msg => value =>
  (value && /[^a-zA-Z'.\- ]/i.test(value)
    ? `${msg} must be between 2 and 30 alpha characters (A-Z).`
    : undefined);

export const alphaNumericName = customAlpha('Name');

export const formatCost = (input) => {
  if (!input) return '';

  return input
      .replace(/,/g , '')
      .replace(/[^0-9.]/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const normalizeCost = (val) => {
  return val.replace(/,/g , '');
}

export const onlyDecimal = value => {
  value = value
    .replace(/[^0-9.]/g, '') // Remove all chars except numbers and .

  // Create an array with sections split by .
  const sections = value.split('.')

  // Remove any leading 0s apart from single 0
  if (sections[0] !== '0' && sections[0] !== '00') {
    sections[0] = sections[0].replace(/^0+/, '')
  } else {
    sections[0] = '0'
  }

  // If numbers exist after first .
  if (sections[1]) {
    // Join first two sections and truncate end section to length 2
    return sections[0] + '.' + sections[1].slice(0, 2)
  // If original value had a decimal place at the end, add it back
  } else if (value.indexOf('.') !== -1) {
    return sections[0] + '.'
  // Otherwise, return only section
  } else {
    return sections[0]
  }
}
