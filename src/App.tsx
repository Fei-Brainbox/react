import { useReducer } from 'react'
import useDocumentTitle from './hooks/useDocumentTitle'
import useProducts from './hooks/useProducts'
import { ThemeProvider } from './context/ThemeContext'
import SearchBar from './components/SearchBar'
import ResultTable from './components/ResultTable'

	type FilterState = {
			searchText: string
			inStockOnly: boolean
		}

	type FilterAction = 
		| { type: 'SET_SEARCH_TEXT'; value: string }
		| { type: 'SET_IN_STOCK_ONLY', value: boolean }
	

	const initialState: FilterState = { searchText: '', inStockOnly: false };

	function filterReducer(state: FilterState, action: FilterAction): FilterState {
		switch (action.type) {
			case 'SET_SEARCH_TEXT':
				return { ...state, searchText: action.value };
			case 'SET_IN_STOCK_ONLY':
				return { ...state, inStockOnly: action.value };
		}
	}

function App() {
	const [filters, dispatch] = useReducer(filterReducer, initialState);
	const load = useProducts();

	const filtered = load.status === 'success' ? load.products.filter(item => 
		item.name.toLowerCase().includes(filters.searchText.toLowerCase()) &&
		(!filters.inStockOnly || item.stocked)
	) : [];

	useDocumentTitle(`Filtered Products (${filtered.length})`);

	if(load.status === 'loading') return <div>Loading...</div>;
	if(load.status === 'error') return <div>Error: {load.message}</div>;

	return (
		<>
		<ThemeProvider value="system">
			<SearchBar 
				searchText={filters.searchText}
				setSearchText={(text: string) => dispatch({ type: 'SET_SEARCH_TEXT', value: text })}
				inStockOnly={filters.inStockOnly}
				setInStockOnly={(inStock: boolean) => dispatch({ type: 'SET_IN_STOCK_ONLY', value: inStock })}
			/>
		
			<ResultTable products={filtered} />
		</ThemeProvider>
		</>
		
	);
}

export default App
