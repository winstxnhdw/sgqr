type NumberString = `${number}`

interface CodeParameterGeneric {
  id: '00' | '01' | '52' | '53' | '54' | '58' | '59' | '60'
  value: string
}

interface CodeParameter26 {
  id: '26'
  value: [
    { id: '00'; value: 'SG.PAYNOW' },
    { id: '01'; value: '0' | '2' },
    { id: '02'; value: NumberString | `+${string}` },
    { id: '03'; value: '0' | '1' },
    { id: '04'; value: NumberString },
  ]
}

interface CodeParameter62 {
  id: '62'
  value: [{ id: '01'; value: string }]
}

export type CodeParameter = CodeParameterGeneric | CodeParameter26 | CodeParameter62
