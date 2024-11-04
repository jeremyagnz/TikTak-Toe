export const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handledClick = () => {
    updateBoard(index);
  }
  return (
    <div onClick={handledClick} className={className}>
      {children}
    </div>
  )
}