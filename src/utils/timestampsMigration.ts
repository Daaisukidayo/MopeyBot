const quotedEndDate = /("endDate"\s*:\s*)"(\d+)"/g

export function timestampsToNumbers(value: string): string {
  return value.replace(quotedEndDate, "$1$2")
}
