export function getFilePathBackend(itemName: string) {
  return process.env.REACT_APP_API_BASE_URL + '/uploads/' + itemName
}

export function getFormatedDate(dateStr: string) {
  return new Intl.DateTimeFormat('en-EN', { month: 'long', day: '2-digit' }).format(Date.parse(dateStr))
}