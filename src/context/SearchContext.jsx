import { createContext, useContext, useState } from 'react';

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    return (
        <SearchContext.Provider
            value={{ query, setQuery, isOpen, setIsOpen, activeCategory, setActiveCategory, sortBy, setSortBy }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error('useSearch must be used within SearchProvider');
    return ctx;
}
