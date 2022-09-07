import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import PropTypes from 'prop-types';
const Table = ({selectedSort, onSort, columns, data, children}) => {
    return (
        <table className="table" style={{width: '1100px'}}>
            {children ||
                <>
                    <TableHeader {...{selectedSort, onSort, columns}}/>
                    <TableBody {...{data, columns}} />
                </> }
        </table>

    );
};
Table.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func,
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    children: PropTypes.array
};
export default Table;
