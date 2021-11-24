export const userID = 'some_id'
export const noBlankErrorMessage = 'Cannot be blank'

export const variables = [
  { value: 'temp', label: 'Air temperature' },
  { value: 'wind', label: 'Wind speed' },
  { value: 'prec', label: 'Precipitation' },
]

export const units = [
  { value: 'metric', label: '°C, m/s' },
  { value: 'imperial', label: '°F, mph' },
  { value: 'mm', label: 'mm' },
]

export const conditions = [
  { value: '<', label: '<' },
  { value: '>', label: '>' },
]

export const tariff = {
  free: 'free',
  startup: 'startup',
  developer: 'developer',
  professional: 'professional',
  enterprise: 'enterprise',
}
