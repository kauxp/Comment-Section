import React, { useState } from 'react';

const Sort = ({ onSortChange }) => {
    const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order

    const handleSortChange = (e) => {
        const newOrder = e.target.value;
        setSortOrder(newOrder);
        onSortChange(newOrder); // Notify parent component of the new sorting order
    };

    return (
        <div className="p-4">
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select
                id="sort"
                value={sortOrder}
                onChange={handleSortChange}
                className="border p-1 rounded"
            >
                <option value="asc">Date (Oldest First)</option>
                <option value="desc">Date (Newest First)</option>
            </select>
        </div>
    );
};

export default Sort;
