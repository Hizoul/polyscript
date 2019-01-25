const notNull: (value: any) => boolean = (value) => {
  return value !== undefined && value !== null
}

export default notNull
