import { useGetTheme } from '../context/ThemeContext'

type SearchBarProps = {
    searchText: string
    setSearchText: (text: string) => void
    inStockOnly: boolean
    setInStockOnly: (inStock: boolean) => void
  }


export default function SearchBar({ 
  searchText,
  setSearchText,
  inStockOnly,
  setInStockOnly,
}: SearchBarProps) {
  const theme = useGetTheme();

  return (
    <>
      <h2>Current Theme: {theme}</h2>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <input 
        type="checkbox" 
        checked={inStockOnly}
        onChange={(e) => setInStockOnly(e.target.checked)}
      /> In Stock Only
    </>
  );
}  